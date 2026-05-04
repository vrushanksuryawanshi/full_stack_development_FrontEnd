$base = "c:\Users\ashwi\Downloads\100_Website_full_stack\apps"

$categories = @("saas","ai-ml","fintech","social","ecommerce","devtools","education","realtime")
foreach ($cat in $categories) {
    New-Item -ItemType Directory -Force -Path "$base\$cat" | Out-Null
}

function Make-App($folder, $filename, $title, $icon, $accent) {
    $path = "$base\$folder\$filename"
    $css = @'
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#0a0a14;color:#eee;min-height:100vh;padding:24px}
.app-header{display:flex;align-items:center;gap:12px;margin-bottom:24px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,.08)}
.app-header h1{font-size:22px;font-weight:700}
.icon{font-size:32px}
.card{background:#12122a;border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:20px;margin-bottom:16px;transition:border-color .2s}
.card:hover{border-color:rgba(255,255,255,.15)}
.card h3{font-size:15px;margin-bottom:8px}
.card p{font-size:13px;color:#888;line-height:1.6}
.btn{display:inline-flex;align-items:center;gap:6px;padding:10px 20px;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;transition:transform .15s;font-family:inherit}
.btn:hover{transform:translateY(-2px)}
input,textarea,select{width:100%;padding:10px 14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:8px;color:#eee;font-family:inherit;font-size:13px;outline:none}
label{display:block;font-size:12px;font-weight:600;color:#888;margin-bottom:6px;text-transform:uppercase;letter-spacing:.5px}
.form-group{margin-bottom:16px}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.stat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-bottom:20px}
.stat-box{background:#12122a;border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:16px;text-align:center}
.stat-box .val{font-size:24px;font-weight:800}
.stat-box .lbl{font-size:11px;color:#888;margin-top:4px;text-transform:uppercase}
.list-item{display:flex;align-items:center;gap:12px;padding:12px 16px;background:#12122a;border:1px solid rgba(255,255,255,.08);border-radius:10px;margin-bottom:8px;transition:all .2s}
.list-item:hover{border-color:rgba(255,255,255,.15);transform:translateX(4px)}
.tab-bar{display:flex;gap:4px;background:rgba(255,255,255,.03);border-radius:10px;padding:4px;margin-bottom:20px}
.tab{flex:1;padding:8px;text-align:center;border-radius:8px;font-size:12px;font-weight:600;color:#888;cursor:pointer;border:none;background:none;font-family:inherit}
.tab.active{color:#fff}
.progress-bar{height:8px;background:rgba(255,255,255,.08);border-radius:8px;overflow:hidden;margin-top:8px}
.progress-fill{height:100%;border-radius:8px;transition:width .5s ease}
.table{width:100%;border-collapse:collapse;font-size:13px}
.table th,.table td{padding:10px 14px;text-align:left;border-bottom:1px solid rgba(255,255,255,.08)}
.table th{font-size:11px;text-transform:uppercase;color:#888;letter-spacing:.5px}
.tag{display:inline-block;padding:3px 10px;border-radius:20px;font-size:10px;font-weight:600;margin-right:4px}
@media(max-width:600px){.grid-2{grid-template-columns:1fr}.stat-grid{grid-template-columns:1fr 1fr}}
'@

    $html = "<!DOCTYPE html>`n<html lang=`"en`">`n<head>`n<meta charset=`"UTF-8`">`n<meta name=`"viewport`" content=`"width=device-width, initial-scale=1.0`">`n<title>$title</title>`n<link href=`"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap`" rel=`"stylesheet`">`n<style>`n$css`n.btn{background:$accent}`n.card h3{color:$accent}`n.stat-box .val{color:$accent}`n.tab.active{background:$accent}`n.progress-fill{background:$accent}`n.tag{background:${accent}22;color:$accent}`n</style>`n</head>`n<body>`n<div class=`"app-header`">`n<span class=`"icon`">$icon</span>`n<div><h1>$title</h1></div>`n</div>`n<div id=`"app`"></div>`n<script>`n// $title - Full Stack App`nconsole.log('$title loaded');`n</script>`n</body>`n</html>"
    
    Set-Content -Path $path -Value $html -Encoding UTF8
}

# SAAS (20)
Make-App "saas" "task-manager.html" "Task Manager" "&#x2705;" "#7c5cff"
Make-App "saas" "team-chat.html" "Team Chat Tool" "&#x1F4AC;" "#7c5cff"
Make-App "saas" "kanban-board.html" "Kanban Board" "&#x1F4CB;" "#7c5cff"
Make-App "saas" "time-tracker.html" "Time Tracker" "&#x23F1;" "#7c5cff"
Make-App "saas" "subscription-tracker.html" "Subscription Tracker" "&#x1F504;" "#7c5cff"
Make-App "saas" "resume-builder.html" "Resume Builder" "&#x1F4C4;" "#7c5cff"
Make-App "saas" "invoice-generator.html" "Invoice Generator" "&#x1F9FE;" "#7c5cff"
Make-App "saas" "meeting-scheduler.html" "Meeting Scheduler" "&#x1F4C5;" "#7c5cff"
Make-App "saas" "habit-tracker.html" "Habit Tracker" "&#x1F4CA;" "#7c5cff"
Make-App "saas" "notes-app.html" "Cloud Notes" "&#x1F4DD;" "#7c5cff"
Make-App "saas" "bookmark-manager.html" "Bookmark Manager" "&#x1F516;" "#7c5cff"
Make-App "saas" "doc-collab.html" "Doc Collaboration" "&#x1F4D1;" "#7c5cff"
Make-App "saas" "writing-assistant.html" "Writing Assistant" "&#x270D;" "#7c5cff"
Make-App "saas" "email-campaign.html" "Email Campaigns" "&#x1F4E7;" "#7c5cff"
Make-App "saas" "crm-system.html" "CRM System" "&#x1F91D;" "#7c5cff"
Make-App "saas" "bug-tracker.html" "Bug Tracker" "&#x1F41B;" "#7c5cff"
Make-App "saas" "leave-manager.html" "Leave Manager" "&#x1F3D6;" "#7c5cff"
Make-App "saas" "knowledge-base.html" "Knowledge Base" "&#x1F4DA;" "#7c5cff"
Make-App "saas" "dashboard-aggregator.html" "Dashboard Aggregator" "&#x1F4F1;" "#7c5cff"
Make-App "saas" "url-analytics.html" "URL Analytics" "&#x1F4C8;" "#7c5cff"

# AI-ML (15)
Make-App "ai-ml" "ai-chatbot.html" "AI Chatbot" "&#x1F916;" "#06b6d4"
Make-App "ai-ml" "resume-analyzer.html" "Resume Analyzer" "&#x1F50D;" "#06b6d4"
Make-App "ai-ml" "sentiment-dashboard.html" "Sentiment Analysis" "&#x1F60A;" "#06b6d4"
Make-App "ai-ml" "code-explainer.html" "Code Explainer" "&#x1F4A1;" "#06b6d4"
Make-App "ai-ml" "blog-generator.html" "Blog Generator" "&#x1F4F0;" "#06b6d4"
Make-App "ai-ml" "fake-news-detector.html" "Fake News Detector" "&#x1F575;" "#06b6d4"
Make-App "ai-ml" "image-captioner.html" "Image Captioner" "&#x1F5BC;" "#06b6d4"
Make-App "ai-ml" "voice-notes.html" "Voice Notes" "&#x1F3A4;" "#06b6d4"
Make-App "ai-ml" "study-planner-ai.html" "AI Study Planner" "&#x1F393;" "#06b6d4"
Make-App "ai-ml" "recommendation-engine.html" "Recommendation Engine" "&#x1F3AC;" "#06b6d4"
Make-App "ai-ml" "fitness-advisor.html" "AI Fitness Advisor" "&#x1F4AA;" "#06b6d4"
Make-App "ai-ml" "chat-pdf.html" "Chat with PDF" "&#x1F4C4;" "#06b6d4"
Make-App "ai-ml" "flashcard-gen.html" "AI Flashcard Gen" "&#x1F5C2;" "#06b6d4"
Make-App "ai-ml" "email-reply-gen.html" "Email Reply Gen" "&#x2709;" "#06b6d4"
Make-App "ai-ml" "interview-prep.html" "Interview Prep" "&#x1F3AF;" "#06b6d4"

# FINTECH (15)
Make-App "fintech" "expense-tracker.html" "Expense Tracker" "&#x1F4B8;" "#10b981"
Make-App "fintech" "stock-portfolio.html" "Stock Portfolio" "&#x1F4C8;" "#10b981"
Make-App "fintech" "crypto-dashboard.html" "Crypto Dashboard" "&#x20BF;" "#10b981"
Make-App "fintech" "loan-calculator.html" "Loan Calculator" "&#x1F3E6;" "#10b981"
Make-App "fintech" "budget-planner.html" "Budget Planner" "&#x1F4B0;" "#10b981"
Make-App "fintech" "tax-calculator.html" "Tax Calculator" "&#x1F9EE;" "#10b981"
Make-App "fintech" "financial-goals.html" "Financial Goals" "&#x1F3AF;" "#10b981"
Make-App "fintech" "splitwise-clone.html" "Split Bills" "&#x1F4B3;" "#10b981"
Make-App "fintech" "payment-tracker.html" "Payment Tracker" "&#x1F9FE;" "#10b981"
Make-App "fintech" "billing-system.html" "Billing System" "&#x1F4B2;" "#10b981"
Make-App "fintech" "credit-simulator.html" "Credit Simulator" "&#x1F4CA;" "#10b981"
Make-App "fintech" "donation-platform.html" "Donation Platform" "&#x2764;" "#10b981"
Make-App "fintech" "crowdfunding.html" "Crowdfunding" "&#x1F680;" "#10b981"
Make-App "fintech" "e-wallet.html" "E-Wallet" "&#x1F45B;" "#10b981"
Make-App "fintech" "financial-analytics.html" "Finance Analytics" "&#x1F4C9;" "#10b981"

# SOCIAL (10)
Make-App "social" "social-media.html" "Social Media" "&#x1F4F1;" "#f472b6"
Make-App "social" "reddit-forum.html" "Forum App" "&#x1F5E3;" "#f472b6"
Make-App "social" "qa-platform.html" "Q and A Platform" "&#x2753;" "#f472b6"
Make-App "social" "event-platform.html" "Event Platform" "&#x1F389;" "#f472b6"
Make-App "social" "blog-platform.html" "Blog Platform" "&#x1F4DD;" "#f472b6"
Make-App "social" "confession-app.html" "Confession App" "&#x1F92B;" "#f472b6"
Make-App "social" "dev-community.html" "Dev Community" "&#x1F468;" "#f472b6"
Make-App "social" "study-group.html" "Study Groups" "&#x1F4D6;" "#f472b6"
Make-App "social" "poll-platform.html" "Poll Platform" "&#x1F5F3;" "#f472b6"
Make-App "social" "review-system.html" "Review System" "&#x2B50;" "#f472b6"

# ECOMMERCE (10)
Make-App "ecommerce" "ecommerce-store.html" "E-Commerce Store" "&#x1F6CD;" "#f59e0b"
Make-App "ecommerce" "marketplace.html" "Marketplace" "&#x1F3EA;" "#f59e0b"
Make-App "ecommerce" "food-ordering.html" "Food Ordering" "&#x1F354;" "#f59e0b"
Make-App "ecommerce" "digital-store.html" "Digital Store" "&#x1F4BF;" "#f59e0b"
Make-App "ecommerce" "auction-platform.html" "Auction Platform" "&#x1F528;" "#f59e0b"
Make-App "ecommerce" "booking-system.html" "Booking System" "&#x1F3E8;" "#f59e0b"
Make-App "ecommerce" "grocery-delivery.html" "Grocery Delivery" "&#x1F6D2;" "#f59e0b"
Make-App "ecommerce" "subscription-box.html" "Subscription Box" "&#x1F4E6;" "#f59e0b"
Make-App "ecommerce" "print-on-demand.html" "Print on Demand" "&#x1F455;" "#f59e0b"
Make-App "ecommerce" "inventory-mgmt.html" "Inventory Manager" "&#x1F4E6;" "#f59e0b"

# DEVTOOLS (10)
Make-App "devtools" "code-snippets.html" "Code Snippets" "&#x1F4BE;" "#8b5cf6"
Make-App "devtools" "api-tester.html" "API Tester" "&#x1F50C;" "#8b5cf6"
Make-App "devtools" "json-formatter.html" "JSON Formatter" "&#x1F4CB;" "#8b5cf6"
Make-App "devtools" "url-shortener.html" "URL Shortener" "&#x1F517;" "#8b5cf6"
Make-App "devtools" "log-monitor.html" "Log Monitor" "&#x1F4CA;" "#8b5cf6"
Make-App "devtools" "github-tracker.html" "GitHub Tracker" "&#x1F419;" "#8b5cf6"
Make-App "devtools" "markdown-editor.html" "Markdown Editor" "&#x270D;" "#8b5cf6"
Make-App "devtools" "regex-tester.html" "Regex Tester" "&#x1F50D;" "#8b5cf6"
Make-App "devtools" "sql-runner.html" "SQL Runner" "&#x1F5C4;" "#8b5cf6"
Make-App "devtools" "portfolio-gen.html" "Portfolio Generator" "&#x1F310;" "#8b5cf6"

# EDUCATION (10)
Make-App "education" "quiz-platform.html" "Quiz Platform" "&#x2753;" "#3b82f6"
Make-App "education" "course-platform.html" "Course Platform" "&#x1F393;" "#3b82f6"
Make-App "education" "flashcard-system.html" "Flashcard System" "&#x1F5C2;" "#3b82f6"
Make-App "education" "coding-practice.html" "Coding Practice" "&#x1F4BB;" "#3b82f6"
Make-App "education" "exam-results.html" "Exam Results" "&#x1F4CA;" "#3b82f6"
Make-App "education" "attendance-mgmt.html" "Attendance Manager" "&#x1F4CB;" "#3b82f6"
Make-App "education" "study-planner.html" "Study Planner" "&#x1F4C5;" "#3b82f6"
Make-App "education" "language-app.html" "Language Learning" "&#x1F30D;" "#3b82f6"
Make-App "education" "doubt-solver.html" "Doubt Solver" "&#x1F64B;" "#3b82f6"
Make-App "education" "assignment-system.html" "Assignments" "&#x1F4DD;" "#3b82f6"

# REALTIME (10)
Make-App "realtime" "realtime-chat.html" "Real-Time Chat" "&#x1F4AC;" "#ef4444"
Make-App "realtime" "live-editor.html" "Live Editor" "&#x1F4DD;" "#ef4444"
Make-App "realtime" "multiplayer-game.html" "Multiplayer Game" "&#x1F3AE;" "#ef4444"
Make-App "realtime" "live-polling.html" "Live Polling" "&#x1F4CA;" "#ef4444"
Make-App "realtime" "stock-live.html" "Stock Live Tracker" "&#x1F4C8;" "#ef4444"
Make-App "realtime" "ride-sharing.html" "Ride Sharing" "&#x1F697;" "#ef4444"
Make-App "realtime" "delivery-tracker.html" "Delivery Tracker" "&#x1F4E6;" "#ef4444"
Make-App "realtime" "whiteboard.html" "Online Whiteboard" "&#x1F3A8;" "#ef4444"
Make-App "realtime" "video-call.html" "Video Call" "&#x1F4F9;" "#ef4444"
Make-App "realtime" "notification-system.html" "Notification System" "&#x1F514;" "#ef4444"

Write-Host "SUCCESS: All 100 app templates created!" -ForegroundColor Green
