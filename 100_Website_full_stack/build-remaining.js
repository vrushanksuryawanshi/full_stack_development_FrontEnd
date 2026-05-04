const fs = require('fs');
const path = require('path');
const base = path.join(__dirname, 'apps');

// Extract registry array from app-registry.js
const registryCode = fs.readFileSync(path.join(__dirname, 'scripts', 'app-registry.js'), 'utf8');
let APP_REGISTRY = [];
eval(registryCode.replace('const APP_REGISTRY =', 'APP_REGISTRY ='));

const skipIds = [
    'task-manager', 'team-chat', 'kanban-board', 'time-tracker', 'subscription-tracker',
    'resume-builder', 'invoice-generator', 'meeting-scheduler', 'habit-tracker', 'notes-app',
    'bookmark-manager'
];

function getAccent(cat) {
    const accents = {
        'saas': '#7c5cff', 'ai-ml': '#06b6d4', 'fintech': '#10b981',
        'social': '#f472b6', 'ecommerce': '#f59e0b', 'devtools': '#8b5cf6',
        'education': '#3b82f6', 'realtime': '#ef4444'
    };
    return accents[cat] || '#7c5cff';
}

function getTemplate(app) {
    const accent = getAccent(app.category);
    const css = `
        *{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'Inter',sans-serif;background:#0a0a14;color:#eee;min-height:100vh;padding:24px}
        .hdr{display:flex;align-items:center;gap:10px;margin-bottom:20px;padding-bottom:14px;border-bottom:1px solid rgba(255,255,255,.08)}
        .hdr h1{font-size:20px;font-weight:700}.hdr .ico{font-size:28px}
        .bdg{padding:3px 10px;background:${accent}22;color:${accent};border-radius:20px;font-size:10px;font-weight:600}
        .crd{background:#12122a;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:20px;margin-bottom:16px}
        .crd h3{font-size:15px;margin-bottom:8px;color:${accent}}
        .crd p{font-size:13px;color:#888;line-height:1.6}
        .btn{padding:10px 20px;background:${accent};color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;margin-top:10px}
        input,textarea{width:100%;padding:10px 14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:8px;color:#eee;margin-top:10px;outline:none}
        input:focus,textarea:focus{border-color:${accent}}
        .sg{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:12px;margin-bottom:20px}
        .sb{background:#12122a;border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:14px;text-align:center}
        .sb .v{font-size:22px;font-weight:800;color:${accent}}
        .sb .l{font-size:10px;color:#666;margin-top:4px;text-transform:uppercase}
        .list{margin-top:16px}
        .li{display:flex;justify-content:space-between;align-items:center;padding:12px;background:rgba(255,255,255,.03);border-radius:8px;margin-bottom:8px}
        .li .del{background:none;border:none;color:#ef4444;cursor:pointer}
    `;

    let body = '', script = '';

    if (['saas', 'devtools', 'education'].includes(app.category)) {
        // CRUD
        body = `
            <div class="crd">
                <h3>Create New Entry</h3>
                <input id="in" placeholder="Enter details...">
                <button class="btn" onclick="add()">+ Add</button>
            </div>
            <div class="list" id="ls"></div>
        `;
        script = `
            let items = JSON.parse(localStorage.getItem('${app.id}') || '[]');
            function add() {
                const v = document.getElementById('in').value;
                if(!v) return;
                items.push({id: Date.now(), text: v});
                document.getElementById('in').value = '';
                save(); render();
            }
            function del(id) { items = items.filter(i=>i.id!==id); save(); render(); }
            function save() { localStorage.setItem('${app.id}', JSON.stringify(items)); }
            function render() {
                document.getElementById('ls').innerHTML = items.length ? 
                    items.map(i=>'<div class="li"><span>'+i.text+'</span><button class="del" onclick="del('+i.id+')">✕</button></div>').join('') :
                    '<p style="color:#666">No items yet. Add one above.</p>';
            }
            render();
        `;
    } else if (app.category === 'ai-ml') {
        // AI Chat / Generator
        body = `
            <div class="crd" style="height:300px;overflow-y:auto;display:flex;flex-direction:column;gap:10px" id="chat">
                <div style="background:${accent}22;padding:10px;border-radius:8px;align-self:flex-start;max-width:80%">Hello! I am your AI for ${app.name}. How can I help?</div>
            </div>
            <div style="display:flex;gap:10px">
                <input id="in" placeholder="Ask or generate something..." style="margin:0;flex:1">
                <button class="btn" style="margin:0" onclick="ask()">Send</button>
            </div>
        `;
        script = `
            function ask() {
                const v = document.getElementById('in').value;
                if(!v) return;
                const chat = document.getElementById('chat');
                chat.innerHTML += '<div style="background:rgba(255,255,255,.1);padding:10px;border-radius:8px;align-self:flex-end;max-width:80%">' + v + '</div>';
                document.getElementById('in').value = '';
                chat.scrollTop = chat.scrollHeight;
                setTimeout(() => {
                    chat.innerHTML += '<div style="background:${accent}22;padding:10px;border-radius:8px;align-self:flex-start;max-width:80%">Here is a simulated AI response for: "' + v + '". Processing complete!</div>';
                    chat.scrollTop = chat.scrollHeight;
                }, 1000);
            }
        `;
    } else if (['fintech', 'ecommerce'].includes(app.category)) {
        // Dashboard
        body = `
            <div class="sg">
                <div class="sb"><div class="v" id="s1">1,024</div><div class="l">Total Volume</div></div>
                <div class="sb"><div class="v" id="s2">$45.2K</div><div class="l">Revenue</div></div>
                <div class="sb"><div class="v" id="s3">+12%</div><div class="l">Growth</div></div>
            </div>
            <div class="crd">
                <h3>Recent Activity</h3>
                <div class="list" id="ls"></div>
                <button class="btn" onclick="gen()">Simulate Action</button>
            </div>
        `;
        script = `
            let items = [];
            function gen() {
                items.unshift('Action completed at ' + new Date().toLocaleTimeString());
                if(items.length > 5) items.pop();
                document.getElementById('s1').innerText = Math.floor(Math.random()*5000);
                render();
            }
            function render() {
                document.getElementById('ls').innerHTML = items.length ? 
                    items.map(i=>'<div class="li">'+i+'</div>').join('') : '<p style="color:#666">No activity yet.</p>';
            }
            render();
        `;
    } else {
        // Social / Realtime - Feed
        body = `
            <div class="crd">
                <textarea id="in" placeholder="What's happening?"></textarea>
                <button class="btn" onclick="post()">Post</button>
            </div>
            <div id="feed"></div>
        `;
        script = `
            let posts = JSON.parse(localStorage.getItem('${app.id}') || '[]');
            function post() {
                const v = document.getElementById('in').value;
                if(!v) return;
                posts.unshift({id: Date.now(), text: v, time: new Date().toLocaleTimeString()});
                document.getElementById('in').value = '';
                save(); render();
            }
            function save() { localStorage.setItem('${app.id}', JSON.stringify(posts)); }
            function render() {
                document.getElementById('feed').innerHTML = posts.length ? 
                    posts.map(p=>'<div class="crd" style="margin-bottom:10px"><div style="font-size:11px;color:#888;margin-bottom:6px">'+p.time+'</div><div>'+p.text+'</div></div>').join('') :
                    '<p style="color:#666;text-align:center">No posts yet.</p>';
            }
            render();
            // Simulate incoming realtime data
            setInterval(() => {
                if(Math.random() > 0.8) {
                    posts.unshift({id: Date.now(), text: "Random network event simulated at " + new Date().toLocaleTimeString(), time: new Date().toLocaleTimeString()});
                    if(posts.length>20) posts.pop();
                    save(); render();
                }
            }, 5000);
        `;
    }

    return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>${app.name}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
<style>${css}</style></head><body>
<div class="hdr"><span class="ico">${app.icon}</span><h1>${app.name}</h1><span class="bdg">${app.category.toUpperCase()} App</span></div>
${body}
<script>${script}</script>
</body></html>`;
}

let count = 0;
APP_REGISTRY.forEach(app => {
    if (skipIds.includes(app.id)) return;
    
    const dir = path.join(base, app.category);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    const filePath = path.join(base, app.file.replace('apps/', ''));
    fs.writeFileSync(filePath, getTemplate(app), 'utf8');
    count++;
});

console.log(`Successfully generated ${count} lightweight functional apps.`);
