# Object-Oriented Memory Matching Game

A clean, minimal, Object-Oriented Memory Matching Game built with HTML, CSS, and modern JavaScript.

**Developed by: Sakif Newaj**

## Features
- **Object-Oriented Programming**: The logic is cleanly divided into `Card` and `MemoryGame` ES6 classes.
- **Dynamic Levels**: The game starts easy (2 pairs) and dynamically adds more pairs as you progress through levels.
- **Points System**: +10 points for a correct match, -2 points for an incorrect guess.
- **Animations**: Smooth 3D CSS flip animations.

## How to Play
1. Click any card to flip it over.
2. Click a second card to try and find its match (the identical number).
3. If they match, they stay face up and you get points.
4. If they don't match, they automatically flip back down after 1 second.
5. Match all pairs on the board to advance to the next level!

## How to host on GitHub Pages ("GitHub Website")

To turn this into a live website you can share with your teacher and friends:

1. Create a new repository on your GitHub account (e.g., `memory-game`).
2. Upload these 3 files (`index.html`, `style.css`, `script.js`) and this `README.md` to the repository.
3. Once uploaded, go to the repository's **Settings** tab.
4. On the left sidebar, click on **Pages**.
5. Under "Build and deployment", look for the **Source** drop-down menu and select the `main` (or `master`) branch.
6. Click **Save**.
7. GitHub will provide you with a link (e.g., `https://<your-username>.github.io/memory-game/`). Wait a few minutes, click the link, and your game will be live!

## Code Structure (For Teacher Explanation)
- **`class Card`**: Responsible for the individual card's properties (`value`, `isFlipped`, `isMatched`) and manipulating its own DOM element.
- **`class MemoryGame`**: Acts as the controller. It manages the array of `Card` objects, handles the game loops, tracks score/levels, and enforces the rules when cards are clicked.
