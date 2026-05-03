// Object-Oriented Memory Matching Game

/**
 * The Card class represents a single card on the board.
 * It encapsulates the card's value, its HTML element, and its state.
 */
class Card {
    constructor(value, id) {
        this.value = value;
        this.id = id;
        this.isFlipped = false;
        this.isMatched = false;
        this.element = this.createHTML();
    }

    // Creates the DOM element for the card
    createHTML() {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.dataset.id = this.id;

        const innerDiv = document.createElement('div');
        innerDiv.classList.add('card-inner');

        const frontDiv = document.createElement('div');
        frontDiv.classList.add('card-front');

        const backDiv = document.createElement('div');
        backDiv.classList.add('card-back');
        backDiv.innerText = this.value;

        innerDiv.appendChild(frontDiv);
        innerDiv.appendChild(backDiv);
        cardDiv.appendChild(innerDiv);

        return cardDiv;
    }

    // Flips the card face up
    flip() {
        if (!this.isFlipped && !this.isMatched) {
            this.isFlipped = true;
            this.element.classList.add('flipped');
            return true;
        }
        return false;
    }

    // Flips the card face down
    unflip() {
        this.isFlipped = false;
        this.element.classList.remove('flipped');
    }

    // Marks the card as permanently matched
    match() {
        this.isMatched = true;
        this.element.classList.add('matched');
    }
}

/**
 * The MemoryGame class manages the overall game logic, levels, and score.
 */
class MemoryGame {
    constructor() {
        this.level = 1;
        this.points = 0;
        this.cards = [];
        this.flippedCards = [];
        this.isLocked = false; // Prevents clicking while animations run
        
        // DOM Elements
        this.boardElement = document.getElementById('game-board');
        this.levelDisplay = document.getElementById('level-display');
        this.pointsDisplay = document.getElementById('points-display');

        this.initLevel();
    }

    // Calculates how many pairs based on the current level
    getPairsCount() {
        // Level 1: 2 pairs (4 cards)
        // Level 2: 3 pairs (6 cards)
        // Level 3: 4 pairs (8 cards), etc.
        return this.level + 1;
    }

    // Sets up the board for the current level
    initLevel() {
        this.cards = [];
        this.flippedCards = [];
        this.isLocked = false;
        this.boardElement.innerHTML = '';
        
        this.updateStats();
        this.generateCards();
        this.renderBoard();
    }

    // Creates the pairs, shuffles them, and creates Card objects
    generateCards() {
        const pairs = this.getPairsCount();
        let values = [];
        
        // Generate values (e.g., numbers 1, 2, 3...)
        for (let i = 1; i <= pairs; i++) {
            values.push(i);
            values.push(i); // Push twice for a pair
        }

        // Shuffle the values array
        values.sort(() => Math.random() - 0.5);

        // Instantiate Card objects
        values.forEach((value, index) => {
            const card = new Card(value, index);
            
            // Add event listener for clicking
            card.element.addEventListener('click', () => this.handleCardClick(card));
            
            this.cards.push(card);
        });
    }

    // Adjusts grid CSS and adds cards to the DOM
    renderBoard() {
        const totalCards = this.cards.length;
        // Determine columns (max 4 columns for aesthetic purposes)
        const cols = Math.min(totalCards / 2, 4);
        
        this.boardElement.style.gridTemplateColumns = `repeat(${cols}, 80px)`;

        this.cards.forEach(card => {
            this.boardElement.appendChild(card.element);
        });
    }

    // Handles the logic when a card is clicked
    handleCardClick(card) {
        // Prevent action if locked, or if card is already flipped/matched
        if (this.isLocked || card.isFlipped || card.isMatched) return;

        // Flip the card
        if (card.flip()) {
            this.flippedCards.push(card);

            // If two cards are flipped, check for match
            if (this.flippedCards.length === 2) {
                this.checkMatch();
            }
        }
    }

    // Checks if the two flipped cards have the same value
    checkMatch() {
        this.isLocked = true; // Lock the board

        const card1 = this.flippedCards[0];
        const card2 = this.flippedCards[1];

        if (card1.value === card2.value) {
            // Match found!
            card1.match();
            card2.match();
            this.points += 10; // Add points
            this.flippedCards = [];
            this.isLocked = false;
            this.updateStats();
            this.checkLevelComplete();
        } else {
            // No match
            this.points = Math.max(0, this.points - 2); // Deduct points, don't go below 0
            this.updateStats();

            // Wait a moment so user can see the cards before unflipping
            setTimeout(() => {
                card1.unflip();
                card2.unflip();
                this.flippedCards = [];
                this.isLocked = false;
            }, 1000);
        }
    }

    // Checks if all cards on the board are matched
    checkLevelComplete() {
        const allMatched = this.cards.every(card => card.isMatched);
        
        if (allMatched) {
            setTimeout(() => {
                alert(`Level ${this.level} Complete! Proceeding to next level...`);
                this.level++;
                this.initLevel();
            }, 500); // Short delay before alert
        }
    }

    // Updates the HTML displays for level and points
    updateStats() {
        this.levelDisplay.innerText = this.level;
        this.pointsDisplay.innerText = this.points;
    }
}

// Initialize the game when the page loads
window.onload = () => {
    new MemoryGame();
};
