/* ============================================
   DASHBOARD — Main controller logic
   ============================================ */

(function () {
    'use strict';

    // --- State ---
    const STORAGE_KEY = 'webapps_hub';
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

    // --- DOM Refs ---
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

    // Close sidebar on overlay click (mobile)
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

    // Ctrl+K shortcut
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
                productivity: 'Productivity', games: 'Games', utilities: 'Utilities',
                'ui-tools': 'UI / Frontend', learning: 'Learning Tools'
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

        // Category filter
        if (currentCategory === 'favorites') {
            apps = apps.filter(a => state.favorites.includes(a.id));
        } else if (currentCategory === 'recent') {
            apps = apps.filter(a => state.usage[a.id]);
            apps.sort((a, b) => (state.usage[b.id]?.lastUsed || 0) - (state.usage[a.id]?.lastUsed || 0));
        } else if (currentCategory !== 'all') {
            apps = apps.filter(a => a.category === currentCategory);
        }

        // Search filter
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
            card.style.animationDelay = `${i * 0.03}s`;
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

            // Click to open app
            card.addEventListener('click', (e) => {
                if (e.target.closest('.app-fav-btn')) return;
                openApp(app);
            });

            // Favorite toggle
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
            productivity: 'linear-gradient(135deg, #6c5ce7, #a29bfe)',
            games: 'linear-gradient(135deg, #e17055, #fab1a0)',
            utilities: 'linear-gradient(135deg, #00b894, #55efc4)',
            'ui-tools': 'linear-gradient(135deg, #fd79a8, #e84393)',
            learning: 'linear-gradient(135deg, #fdcb6e, #f39c12)'
        };
        return gradients[cat] || 'var(--accent-gradient)';
    }

    function formatCategory(cat) {
        return cat.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    // --- Favorites ---
    function toggleFavorite(id) {
        const idx = state.favorites.indexOf(id);
        if (idx > -1) {
            state.favorites.splice(idx, 1);
        } else {
            state.favorites.push(id);
        }
        saveState();
        renderApps();
        updateCounts();
    }

    // --- Usage Tracking ---
    function trackUsage(appId) {
        if (!state.usage[appId]) {
            state.usage[appId] = { count: 0, lastUsed: 0 };
        }
        state.usage[appId].count++;
        state.usage[appId].lastUsed = Date.now();
        state.sessions++;
        saveState();
    }

    // --- Open App (Modal) ---
    function openApp(app) {
        trackUsage(app.id);
        modalTitle.textContent = app.name;
        modalIcon.textContent = app.icon;
        modalIframe.src = app.file;

        // Update modal fav button
        const isFav = state.favorites.includes(app.id);
        $('#modalFavBtn').className = `modal-fav-btn ${isFav ? 'active' : ''}`;
        $('#modalFavBtn').onclick = () => {
            toggleFavorite(app.id);
            const nowFav = state.favorites.includes(app.id);
            $('#modalFavBtn').className = `modal-fav-btn ${nowFav ? 'active' : ''}`;
        };

        // Expand button
        $('#modalExpandBtn').onclick = () => {
            window.open(app.file, '_blank');
        };

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        renderApps(); // Update usage count
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => {
            modalIframe.src = 'about:blank';
        }, 300);
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
        $('#statUsed').textContent = usedApps;
        $('#statSessions').textContent = totalSessions;
    }

    function updateCounts() {
        $('#count-favorites').textContent = state.favorites.length;
        const recentCount = Object.keys(state.usage).length;
        $('#count-recent').textContent = recentCount;
    }

    // --- Init ---
    renderApps();
    updateCounts();
})();
