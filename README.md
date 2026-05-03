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

## Code Structure (For Teacher Explanation)
- **`class Card`**: Responsible for the individual card's properties (`value`, `isFlipped`, `isMatched`) and manipulating its own DOM element.
- **`class MemoryGame`**: Acts as the controller. It manages the array of `Card` objects, handles the game loops, tracks score/levels, and enforces the rules when cards are clicked.
