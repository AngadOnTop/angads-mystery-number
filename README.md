# 🎯 CLI Guess the Number

> A fun, colorful, and interactive command-line number guessing game built with Node.js.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)  
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D14-green.svg)](https://nodejs.org/)  

---

## 💡 Features

- Animated rainbow welcome screen (via `chalk-animation`)  
- ASCII art banner (via `figlet`)  
- Colorful backgrounds for output (via `chalk`)  
- Loading spinners when restarting (via `ora`)  
- Multiple difficulty levels (Easy / Medium / Hard)  
- Play-again option with smooth reset  
- Fully terminal-based — no GUI required  

---

## 🧰 Setup & Run

```bash
# Clone the repository
git clone https://github.com/AngadOnTop/angads-mystery-number.git
cd angads-mystery-number

# Install dependencies
npm install

# Run the game
node game.js


🎮 How to Play

You’ll see an animated welcome screen.

Pick a difficulty:

1. Easy → 10 lives

2. Medium → 5 lives

3. Hard → 3 lives

Guess the number (1–100). The game will tell you if it’s higher or lower.

You win if you guess correctly before you lose all your lives.

After each game, you’ll be asked if you want to play again.

🔧 Internals & Logic

The player is fixed at the bottom row in the display grid.

A random number is generated at the start of each game.

Lives are decremented each wrong guess.

When guess matches the random number, you win.

If lives run out, game over.

On restart, the game resets state and displays the welcome/choice flow again.
