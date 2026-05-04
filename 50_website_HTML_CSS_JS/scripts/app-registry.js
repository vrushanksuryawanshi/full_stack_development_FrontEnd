/* ============================================
   APP REGISTRY — All 50 apps defined here
   ============================================ */

const APP_REGISTRY = [
    // === PRODUCTIVITY (10) ===
    { id: 'todo-list', name: 'To-Do List', icon: '✅', category: 'productivity', description: 'Task management with priorities & deadlines', file: 'apps/productivity/todo-list.html' },
    { id: 'pomodoro-timer', name: 'Pomodoro Timer', icon: '🍅', category: 'productivity', description: 'Focus timer with work/break intervals', file: 'apps/productivity/pomodoro-timer.html' },
    { id: 'notes-app', name: 'Notes App', icon: '📝', category: 'productivity', description: 'Rich notes with localStorage persistence', file: 'apps/productivity/notes-app.html' },
    { id: 'habit-tracker', name: 'Habit Tracker', icon: '📊', category: 'productivity', description: 'Track daily habits with streak counting', file: 'apps/productivity/habit-tracker.html' },
    { id: 'daily-planner', name: 'Daily Planner', icon: '📅', category: 'productivity', description: 'Plan your day hour by hour', file: 'apps/productivity/daily-planner.html' },
    { id: 'password-generator', name: 'Password Generator', icon: '🔐', category: 'productivity', description: 'Generate strong secure passwords', file: 'apps/productivity/password-generator.html' },
    { id: 'markdown-editor', name: 'Markdown Editor', icon: '✍️', category: 'productivity', description: 'Write and preview Markdown in real-time', file: 'apps/productivity/markdown-editor.html' },
    { id: 'expense-tracker', name: 'Expense Tracker', icon: '💰', category: 'productivity', description: 'Track income and expenses with charts', file: 'apps/productivity/expense-tracker.html' },
    { id: 'goal-tracker', name: 'Goal Tracker', icon: '🎯', category: 'productivity', description: 'Set and track progress on your goals', file: 'apps/productivity/goal-tracker.html' },
    { id: 'time-blocking', name: 'Time Blocking', icon: '⏰', category: 'productivity', description: 'Block time slots for focused work', file: 'apps/productivity/time-blocking.html' },

    // === GAMES (10) ===
    { id: 'tic-tac-toe', name: 'Tic Tac Toe', icon: '❌', category: 'games', description: 'Classic X and O game against AI', file: 'apps/games/tic-tac-toe.html' },
    { id: 'snake-game', name: 'Snake Game', icon: '🐍', category: 'games', description: 'Classic snake game with score tracking', file: 'apps/games/snake-game.html' },
    { id: 'memory-card', name: 'Memory Card Game', icon: '🃏', category: 'games', description: 'Match pairs of cards to win', file: 'apps/games/memory-card.html' },
    { id: 'rock-paper-scissors', name: 'Rock Paper Scissors', icon: '✊', category: 'games', description: 'Play RPS against the computer', file: 'apps/games/rock-paper-scissors.html' },
    { id: 'quiz-game', name: 'Quiz Game', icon: '❓', category: 'games', description: 'Test your knowledge across topics', file: 'apps/games/quiz-game.html' },
    { id: 'typing-speed', name: 'Typing Speed Test', icon: '⌨️', category: 'games', description: 'Test your typing speed and accuracy', file: 'apps/games/typing-speed.html' },
    { id: 'sudoku', name: 'Sudoku', icon: '🔢', category: 'games', description: 'Classic number puzzle game', file: 'apps/games/sudoku.html' },
    { id: 'whack-a-mole', name: 'Whack-a-Mole', icon: '🔨', category: 'games', description: 'Whack moles as they pop up', file: 'apps/games/whack-a-mole.html' },
    { id: 'dice-roller', name: 'Dice Roller', icon: '🎲', category: 'games', description: 'Roll dice with 3D animation', file: 'apps/games/dice-roller.html' },
    { id: 'number-guessing', name: 'Number Guessing', icon: '🔮', category: 'games', description: 'Guess the secret number', file: 'apps/games/number-guessing.html' },

    // === UTILITIES (10) ===
    { id: 'calculator', name: 'Calculator', icon: '🧮', category: 'utilities', description: 'Scientific calculator with history', file: 'apps/utilities/calculator.html' },
    { id: 'unit-converter', name: 'Unit Converter', icon: '📐', category: 'utilities', description: 'Convert between units of measurement', file: 'apps/utilities/unit-converter.html' },
    { id: 'currency-converter', name: 'Currency Converter', icon: '💱', category: 'utilities', description: 'Convert currencies with live rates', file: 'apps/utilities/currency-converter.html' },
    { id: 'weather-app', name: 'Weather App', icon: '🌤️', category: 'utilities', description: 'Check weather for any location', file: 'apps/utilities/weather-app.html' },
    { id: 'qr-generator', name: 'QR Code Generator', icon: '📱', category: 'utilities', description: 'Generate QR codes for any text or URL', file: 'apps/utilities/qr-generator.html' },
    { id: 'url-shortener', name: 'URL Shortener UI', icon: '🔗', category: 'utilities', description: 'Shorten long URLs with a clean UI', file: 'apps/utilities/url-shortener.html' },
    { id: 'color-picker', name: 'Color Picker', icon: '🎨', category: 'utilities', description: 'Pick and convert colors between formats', file: 'apps/utilities/color-picker.html' },
    { id: 'regex-tester', name: 'Regex Tester', icon: '🔍', category: 'utilities', description: 'Test regular expressions in real-time', file: 'apps/utilities/regex-tester.html' },
    { id: 'json-formatter', name: 'JSON Formatter', icon: '📋', category: 'utilities', description: 'Format, validate and beautify JSON', file: 'apps/utilities/json-formatter.html' },
    { id: 'text-case-converter', name: 'Text Case Converter', icon: '🔤', category: 'utilities', description: 'Convert text between different cases', file: 'apps/utilities/text-case-converter.html' },

    // === UI/FRONTEND TOOLS (10) ===
    { id: 'gradient-generator', name: 'CSS Gradient Generator', icon: '🌈', category: 'ui-tools', description: 'Create beautiful CSS gradients', file: 'apps/ui-tools/gradient-generator.html' },
    { id: 'box-shadow', name: 'Box Shadow Generator', icon: '🖼️', category: 'ui-tools', description: 'Design and export CSS box shadows', file: 'apps/ui-tools/box-shadow.html' },
    { id: 'flexbox-visualizer', name: 'Flexbox Visualizer', icon: '📦', category: 'ui-tools', description: 'Visualize and learn CSS Flexbox', file: 'apps/ui-tools/flexbox-visualizer.html' },
    { id: 'grid-builder', name: 'Grid Layout Builder', icon: '🏗️', category: 'ui-tools', description: 'Build CSS Grid layouts visually', file: 'apps/ui-tools/grid-builder.html' },
    { id: 'button-generator', name: 'Button Generator', icon: '🔘', category: 'ui-tools', description: 'Design custom CSS buttons', file: 'apps/ui-tools/button-generator.html' },
    { id: 'animation-preview', name: 'Animation Preview', icon: '🎬', category: 'ui-tools', description: 'Preview CSS animations live', file: 'apps/ui-tools/animation-preview.html' },
    { id: 'responsive-tester', name: 'Responsive Tester', icon: '📱', category: 'ui-tools', description: 'Test responsive design breakpoints', file: 'apps/ui-tools/responsive-tester.html' },
    { id: 'navbar-builder', name: 'Navbar Builder', icon: '🧩', category: 'ui-tools', description: 'Build navigation bars visually', file: 'apps/ui-tools/navbar-builder.html' },
    { id: 'theme-generator', name: 'Theme Generator', icon: '🎭', category: 'ui-tools', description: 'Generate color themes for your site', file: 'apps/ui-tools/theme-generator.html' },
    { id: 'font-pairing', name: 'Font Pairing Tool', icon: '🔤', category: 'ui-tools', description: 'Find perfect font combinations', file: 'apps/ui-tools/font-pairing.html' },

    // === LEARNING TOOLS (10) ===
    { id: 'flashcards', name: 'Flashcards App', icon: '🗂️', category: 'learning', description: 'Create and study flashcard decks', file: 'apps/learning/flashcards.html' },
    { id: 'quote-generator', name: 'Quote Generator', icon: '💬', category: 'learning', description: 'Get random inspirational quotes', file: 'apps/learning/quote-generator.html' },
    { id: 'algorithm-visualizer', name: 'Algorithm Visualizer', icon: '📊', category: 'learning', description: 'Visualize sorting algorithms', file: 'apps/learning/algorithm-visualizer.html' },
    { id: 'code-snippets', name: 'Code Snippet Saver', icon: '💾', category: 'learning', description: 'Save and organize code snippets', file: 'apps/learning/code-snippets.html' },
    { id: 'html-editor', name: 'HTML Live Editor', icon: '🌐', category: 'learning', description: 'Write HTML/CSS/JS with live preview', file: 'apps/learning/html-editor.html' },
    { id: 'js-quiz', name: 'JS Quiz App', icon: '📘', category: 'learning', description: 'Test your JavaScript knowledge', file: 'apps/learning/js-quiz.html' },
    { id: 'typing-tutor', name: 'Typing Tutor', icon: '🎹', category: 'learning', description: 'Learn to type faster with lessons', file: 'apps/learning/typing-tutor.html' },
    { id: 'flash-quiz-timer', name: 'Flash Quiz Timer', icon: '⚡', category: 'learning', description: 'Timed quiz with rapid-fire questions', file: 'apps/learning/flash-quiz-timer.html' },
    { id: 'binary-converter', name: 'Binary Converter', icon: '🔢', category: 'learning', description: 'Convert between number systems', file: 'apps/learning/binary-converter.html' },
    { id: 'math-solver', name: 'Math Solver UI', icon: '➗', category: 'learning', description: 'Solve math expressions step by step', file: 'apps/learning/math-solver.html' },
];
