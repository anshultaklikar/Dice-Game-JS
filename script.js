'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

// Starting conditions

let score;
let currentScore;
let activePlayer;

const init = function () {

    score = [0, 0];
    currentScore = 0;
    activePlayer = 0;

    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    diceEl.classList.add('hidden'); // Made a hidden class in css and added it using classList.add
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}

// load the init function
init();

const switchPlayer = () => {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

// Rolling dice functionality
btnRoll.addEventListener('click', () => {
    // Generating a random dice roll
    const num = Math.trunc(Math.random() * 6) + 1;

    // Displaying dice
    diceEl.classList.remove('hidden')
    diceEl.src = `dice-${num}.png`;

    // Check for rolled 1: if true switch to next player
    if (num !== 1) {
        // Add dice to current score
        currentScore += num;

        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
        // Switch to next Player
        // document.getElementById(`current--${activePlayer}`).textContent = 0;
        // currentScore = 0;
        // activePlayer = activePlayer === 0 ? 1 : 0;
        // player0El.classList.toggle('player--active');
        // player1El.classList.toggle('player--active');

        switchPlayer();

    }
})


btnHold.addEventListener('click', () => {
    // add current score to active player's score
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

    // check if Player's score is >= 100
    if (score[activePlayer] >= 100) {

        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        // disble the roll and hold button and hide the dice
        btnRoll.disabled = true;
        btnHold.disabled = true;
        diceEl.classList.add('hidden');

    } else {
        // switch the player
        switchPlayer();
    }
})


// btnNew.addEventListener('click', () => {
//     // window.location.reload();

//     // score0El.textContent = 0;
//     // score1El.textContent = 0;
//     // current0El.textContent = 0;
//     // current1El.textContent = 0;
//     // player0El.classList.remove('player--winner');
//     // player1El.classList.remove('player--winner');
//     // player0El.classList.add('player--active');
//     // player1El.classList.remove('player--active');

//     init();


// })

btnNew.addEventListener('click', init)