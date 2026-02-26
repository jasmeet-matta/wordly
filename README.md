# 🧩 Wordly

Welcome to **Wordly**, a sleek and responsive word-guessing game built with React and TypeScript. It's inspired by the classic Wordle but comes with extra features to make the experience even better! 🚀

## ✨ Features

*   **📏 Dynamic Word Lengths**: Feeling like a quick game? Go for **4 letters**. Want a challenge? Try **6 letters**! You can change this anytime from the side menu.
*   **🌓 Dark Mode Support**: Save your eyes with a beautiful dark theme, or stick to the crisp light mode. Your preference is saved automatically!
*   **📡 Offline-Ready**: Play without worries! The app detects your connection status and alerts you with a snackbar and a subtle vibration 📳 when you go offline.
*   **📱 Mobile Optimized**: Designed as a PWA-friendly experience. No weird scrolling, no accidental zooms—just pure gameplay that feels like a native app.
*   **🧠 Smart Dictionary Validation**: Every word you guess is checked against a real dictionary API. No "cheating" with random letters!
*   **💾 Persistent Game State**: Close your browser mid-game? No problem! Your guesses and settings are saved in local storage so you can pick up right where you left off.
*   **🛡️ Robust Fallbacks**: Even if the word APIs are down, the game won't stop. We've got curated fallback words to keep the fun going.

## 🛠️ Tech Stack

*   **React 18** + **TypeScript** ⚛️
*   **Vite** (for blazing fast builds) ⚡
*   **Tailwind CSS** (for styling) 🎨
*   **Lucide React** & **Heroicons** (for beautiful icons) ✨
*   **Axios** (for API communications) 🌐

## 🚀 Getting Started

1.  **Clone the repo**:
    ```bash
    git clone https://github.com/your-username/wordly.git
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    ```
4.  **Build for production**:
    ```bash
    npm run build
    ```

## 🎮 How to Play

1.  Enter your guess using the on-screen keyboard.
2.  Press **ENTER** to submit.
3.  The tiles will change color to give you hints:
    *   🟩 **Green**: Correct letter, correct spot!
    *   🟨 **Yellow**: Correct letter, wrong spot.
    *   ⬛ **Gray**: Letter not in the word.
4.  You have **6 tries** to guess the target word. Good luck! 🍀

---
Built with ❤️ for word game enthusiasts.
