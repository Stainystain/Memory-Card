// Card array
let cardSymbol = ['fa fa-paper-plane-o', 'fa fa-paper-plane-o',
    'fa fa-bolt', 'fa fa-bolt',
    'fa fa-cube', 'fa fa-cube',
    'fa fa-anchor', 'fa fa-anchor',
    'fa fa-leaf', 'fa fa-leaf',
    'fa fa-bicycle', 'fa fa-bicycle',
    'fa fa-diamond', 'fa fa-diamond',
    'fa fa-bomb', 'fa fa-bomb'
];

// Open card array
let openedCards = [];

// Matched cards array
let matchedCards = [];

// Deck / Card Container
const cardsContainer = document.querySelector('.deck');

/*
 * Build cards & assign symbol
 */
function buildCards() {
    // Shuffle symbols
    shuffle(cardSymbol);
    for (let i = 0; i < cardSymbol.length; i++) {
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = "<i class='" + cardSymbol[i] + "'</i>";
        cardsContainer.appendChild(card);
        // add main click event for each card
        click(card);
    }
}

/*
 * First click
 */
let isFirstClick = true;

/*
 * Click counter
 */
let count = 0;

/*
 * Main click event function
 */
function click(card) {
    card.addEventListener('click', function() {

        // Start stopwatch
        if (isFirstClick) {
            startStopwatch();
            isFirstClick = false;
        }

        // Add click count
        count++;

        const currentCard = this;
        const previousCard = openedCards[0];

        if (openedCards.length === 1 && count < 3) {

            // Show symbol
            card.classList.add('open', 'show', 'disable');

            // If true compare selected symbols
            compare(currentCard, previousCard);
        } else if (count < 3) {

            // Show symbol
            card.classList.add('open', 'show', 'disable');
            openedCards.push(this);
        } else {
            return false;
        }
    });

}

/*
 * Compare selected cards
 */
function compare(currentCard, previousCard) {
    if (currentCard.innerHTML === previousCard.innerHTML) {
        // Add match class & stop further clicks
        currentCard.classList.add('match', 'disable');
        previousCard.classList.add('match', 'disable');

        // Add to matchedCards array
        matchedCards.push(currentCard, previousCard);

        // Clear openedCards array
        openedCards = [];

        // Check if game is completed
        endGame();

    } else {
        // Add mismatch class
        currentCard.classList.add('miss-match', 'disable');
        previousCard.classList.add('miss-match', 'disable');

        //hide symbols after .8 secs
        setTimeout(function() {
            currentCard.classList.remove('open', 'show', 'miss-match', 'disable');
            previousCard.classList.remove('open', 'show', 'miss-match', 'disable');

        }, 800);

        // Clear openedCards array
        openedCards = [];
    }
    // Add move to counter
    addMove();

    // Reset click count
    setTimeout(function() {
        count = 0;
    }, 500);


}

/*
 * Check if game is completed
 */
function endGame() {
    setTimeout(function() {
        if (matchedCards.length === cardSymbol.length) {
            displayModal();
            pauseStopwatch();
        }
    }, 500);
}

/*
 * Shuffle function from http://stackoverflow.com/a/2450976
 */
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * Move counter
 */
const movesCounter = document.getElementById('moves');
let moves = 0;

function addMove() {
    moves++;
    movesCounter.innerHTML = moves;

    // Star Rating
    rating();
}

/*
 * Rating counter
 */
function rating() {
    if (moves > 16) {
        document.getElementById('star-three').style.display = 'none';
    }
    if (moves > 24) {
        document.getElementById('star-two').style.display = 'none';
    }
}

/*
 * Stopwatch
 */
const stopwatchContainer = document.querySelector('.stopWatch');

let stopwatch,
    totalSeconds = 0;

// Set stopWatch
stopwatchContainer.innerHTML = totalSeconds + ' Seconds  ';

function startStopwatch() {
    stopwatch = setInterval(function() {
        totalSeconds++;
        stopwatchContainer.innerHTML = totalSeconds + ' Seconds';
    }, 1000);
}

// pause stopwatch
function pauseStopwatch() {
    clearInterval(stopwatch);
}


/*
 * Start the game
 */
buildCards();

/*
 * Reset the game
 */

//Restart function
function restart() {
    // delete cards
    cardsContainer.innerHTML = '';

    // create new cards
    buildCards();

    // reset arrays
    openedCards = [];
    matchedCards = [];

    // reset moves counter
    moves = 0;
    movesCounter.innerHTML = '0';

    // reset stars
    document.getElementById('star-three').style.display = '';
    document.getElementById('star-two').style.display = '';

    //reset stopWatch
    pauseStopwatch();
    isFirstClick = true;
    totalSeconds = 0;
    stopwatchContainer.innerHTML = totalSeconds + "s";

    // Reset click count
    count = 0;
}

//Restart button
document.querySelector('.restart').addEventListener('click', function() {
    restart();
});
/*
 * End game modal
 */
// Star rating for modal
function modalRating() {
    if (moves > 16) {
        document.getElementById('star-three-modal').style.display = 'none';
    }
    if (moves > 24) {
        document.getElementById('star-two-modal').style.display = 'none';
    }
}


//Display modal function
function displayModal() {
    modal.style.display = "block";

    // Stats for modal
    document.querySelector('.modal-body').innerHTML = 'You completed the game in ' + totalSeconds + ' seconds, and in ' + moves + ' moves!';
    modalRating();

}

const modal = document.getElementById('modal');

// Cross that closes the modal
const span = document.getElementsByClassName('close')[0];

// Close the modal using the x
span.onclick = function() {
    modal.style.display = "none";
};

// Close modal if page is clicked
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};

// Play again button
document.querySelector('.modal-button').addEventListener("click", function playAgain() {
    modal.style.display = "none";
    restart();
});
