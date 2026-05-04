/* ============================================
   DASHBOARD — Main controller logic v2.0
   ============================================ */

(function () {
    'use strict';

    const STORAGE_KEY = 'fullstack_hub_100';
    let state = loadState();
    let currentCategory = 'all';
    let currentSearch = '';
    let currentView = 'grid';

    function defaultState() {
        return { favorites: [], usage: {}, sessions: 0, theme: 'dark' };
    }

    function loadState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            return raw ? { ...defaultState(), ...JSON.parse(raw) } : defaultState();
        } catch { return defaultState(); }
    }

    function saveState() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }

    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const searchInput = $('#searchInput');
    const appsGrid = $('#appsGrid');
    const emptyState = $('#emptyState');
    const pageTitle = $('#pageTitle');
    const appCountBadge = $('#appCountBadge');
    const modalOverlay = $('#modalOverlay');
    const modalIframe = $('#modalIframe');
    const modalTitle = $('#modalTitle');
    const modalIcon = $('#modalIcon');
    const themeToggle = $('#themeToggle');
    const sidebar = $('#sidebar');
    const mobileMenuBtn = $('#mobileMenuBtn');

    // --- Theme ---
    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        state.theme = theme;
        saveState();
    }
    applyTheme(state.theme);

    themeToggle.addEventListener('click', () => {
        applyTheme(state.theme === 'dark' ? 'light' : 'dark');
    });

    // --- Mobile Menu ---
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768 && sidebar.classList.contains('open') &&
            !sidebar.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            sidebar.classList.remove('open');
        }
    });

    // --- Search ---
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase().trim();
        renderApps();
    });

    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
        if (e.key === 'Escape') {
            if (modalOverlay.classList.contains('active')) {
                closeModal();
            } else {
                searchInput.value = '';
                currentSearch = '';
                renderApps();
            }
        }
    });

    // --- Category Navigation ---
    $$('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.nav-item').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;

            const labels = {
                all: 'All Apps', favorites: 'Favorites', recent: 'Recently Used',
                saas: 'SaaS / Productivity', 'ai-ml': 'AI / ML Apps',
                fintech: 'Fintech / Data', social: 'Social / Community',
                ecommerce: 'E-Commerce', devtools: 'Developer Tools',
                education: 'Education', realtime: 'Real-Time / Advanced'
            };
            pageTitle.textContent = labels[currentCategory] || 'All Apps';

            renderApps();
            if (window.innerWidth <= 768) sidebar.classList.remove('open');
        });
    });

    // --- View Toggle ---
    $$('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            $$('.view-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentView = btn.dataset.view;
            appsGrid.classList.toggle('list-view', currentView === 'list');
        });
    });

    // --- Filtering ---
    function getFilteredApps() {
        let apps = [...APP_REGISTRY];

        if (currentCategory === 'favorites') {
            apps = apps.filter(a => state.favorites.includes(a.id));
        } else if (currentCategory === 'recent') {
            apps = apps.filter(a => state.usage[a.id]);
            apps.sort((a, b) => (state.usage[b.id]?.lastUsed || 0) - (state.usage[a.id]?.lastUsed || 0));
        } else if (currentCategory !== 'all') {
            apps = apps.filter(a => a.category === currentCategory);
        }

        if (currentSearch) {
            apps = apps.filter(a =>
                a.name.toLowerCase().includes(currentSearch) ||
                a.description.toLowerCase().includes(currentSearch) ||
                a.category.toLowerCase().includes(currentSearch)
            );
        }

        return apps;
    }

    // --- Render Apps ---
    function renderApps() {
        const apps = getFilteredApps();
        appsGrid.innerHTML = '';

        if (apps.length === 0) {
            emptyState.classList.remove('hidden');
            appsGrid.style.display = 'none';
        } else {
            emptyState.classList.add('hidden');
            appsGrid.style.display = '';
        }

        apps.forEach((app, i) => {
            const card = document.createElement('div');
            card.className = 'app-card';
            card.style.animationDelay = `${i * 0.02}s`;
            card.style.setProperty('--card-accent', getCategoryGradient(app.category));

            const isFav = state.favorites.includes(app.id);
            const usageCount = state.usage[app.id]?.count || 0;

            card.innerHTML = `
                <div class="app-card-header">
                    <div class="app-icon">${app.icon}</div>
                    <button class="app-fav-btn ${isFav ? 'active' : ''}" data-id="${app.id}" aria-label="Toggle Favorite">
                        ${isFav ? '⭐' : '☆'}
                    </button>
                </div>
                <div class="app-name">${app.name}</div>
                <div class="app-description">${app.description}</div>
                <div class="app-card-footer">
                    <span class="app-category-tag" data-cat="${app.category}">${formatCategory(app.category)}</span>
                    <span class="app-usage">${usageCount > 0 ? usageCount + ' uses' : ''}</span>
                </div>
            `;

            card.addEventListener('click', (e) => {
                if (e.target.closest('.app-fav-btn')) return;
                openApp(app);
            });

            card.querySelector('.app-fav-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(app.id);
            });

            appsGrid.appendChild(card);
        });

        appCountBadge.textContent = `${apps.length} app${apps.length !== 1 ? 's' : ''}`;
        updateStats();
    }

    function getCategoryGradient(cat) {
        const gradients = {
            saas: 'linear-gradient(135deg, #7c5cff, #a78bfa)',
            'ai-ml': 'linear-gradient(135deg, #06b6d4, #67e8f9)',
            fintech: 'linear-gradient(135deg, #10b981, #6ee7b7)',
            social: 'linear-gradient(135deg, #f472b6, #fbcfe8)',
            ecommerce: 'linear-gradient(135deg, #f59e0b, #fcd34d)',
            devtools: 'linear-gradient(135deg, #8b5cf6, #c4b5fd)',
            education: 'linear-gradient(135deg, #3b82f6, #93c5fd)',
            realtime: 'linear-gradient(135deg, #ef4444, #fca5a5)'
        };
        return gradients[cat] || 'var(--accent-gradient)';
    }

    function formatCategory(cat) {
        const names = {
            saas: 'SaaS', 'ai-ml': 'AI/ML', fintech: 'Fintech',
            social: 'Social', ecommerce: 'E-Commerce', devtools: 'DevTools',
            education: 'Education', realtime: 'Real-Time'
        };
        return names[cat] || cat;
    }

    // --- Favorites ---
    function toggleFavorite(id) {
        const idx = state.favorites.indexOf(id);
        if (idx > -1) state.favorites.splice(idx, 1);
        else state.favorites.push(id);
        saveState();
        renderApps();
        updateCounts();
    }

    // --- Usage ---
    function trackUsage(appId) {
        if (!state.usage[appId]) state.usage[appId] = { count: 0, lastUsed: 0 };
        state.usage[appId].count++;
        state.usage[appId].lastUsed = Date.now();
        state.sessions++;
        saveState();
    }

    // --- Modal ---
    function openApp(app) {
        trackUsage(app.id);
        modalTitle.textContent = app.name;
        modalIcon.textContent = app.icon;
        modalIframe.src = app.file;

        const isFav = state.favorites.includes(app.id);
        $('#modalFavBtn').className = `modal-fav-btn ${isFav ? 'active' : ''}`;
        $('#modalFavBtn').onclick = () => {
            toggleFavorite(app.id);
            const nowFav = state.favorites.includes(app.id);
            $('#modalFavBtn').className = `modal-fav-btn ${nowFav ? 'active' : ''}`;
        };

        $('#modalExpandBtn').onclick = () => window.open(app.file, '_blank');

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        renderApps();
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { modalIframe.src = 'about:blank'; }, 300);
    }

    $('#modalCloseBtn').addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // --- Stats ---
    function updateStats() {
        const usedApps = Object.keys(state.usage).length;
        const totalSessions = Object.values(state.usage).reduce((sum, u) => sum + u.count, 0);
        $('#statTotal').textContent = APP_REGISTRY.length;
        $('#statFavorites').textContent = state.favorites.length;
        $('#statSessions').textContent = totalSessions;
    }

    function updateCounts() {
        $('#count-favorites').textContent = state.favorites.length;
        $('#count-recent').textContent = Object.keys(state.usage).length;
    }

    // --- Init ---
    renderApps();
    updateCounts();
})();
