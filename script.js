'use strict';

let playerScore = [0, 0];
let currentScore = 0;
let turn = 0;

const rollDice = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');

const diceImg = document.querySelector('.dice');

const playerOneBackground = document.querySelector('.player--0');
const playerOneScore = document.querySelector('#score--0');
const playerOneCurrentScore = document.querySelector('#current--0');

const playerTwoBackground = document.querySelector('.player--1');
const playerTwoScore = document.querySelector('#score--1');
const playerTwoCurrentScore = document.querySelector('#current--1');

const newGameBtn = document.querySelector('.btn--new');

playerOneScore.textContent = 0;
playerTwoScore.textContent = 0;

diceImg.classList.add('hidden');

const startNewGame = () => {
  playerScore = [0, 0];
  playerOneScore.textContent = 0;
  playerTwoScore.textContent = 0;
  playerOneCurrentScore.textContent = 0;
  playerTwoCurrentScore.textContent = 0;
  turn = 0;
  currentScore = 0;
  diceImg.classList.add('hidden');
  if (!playerOneBackground.classList.contains('player--active')) {
    playerOneBackground.classList.add('player--active');
    playerTwoBackground.classList.remove('player--active');
  }
  if (playerOneBackground.classList.contains('player--winner')) {
    playerOneBackground.classList.remove('player-winner');
  } else if (playerTwoBackground.classList.contains('player--winner')) {
    playerTwoBackground.classList.remove('player-winner');
  }
};

const printDice = () => {
  if (diceImg.classList.contains('hidden')) {
    diceImg.classList.remove('hidden');
  }
};

const playerWon = roll => {
  const fullscore = playerScore[turn] + currentScore + roll;
  if (fullscore >= 100) {
    if (turn === 0) {
      playerOneBackground.classList.add('player--winner');
      playerOneScore.textContent = fullscore;
      playerOneCurrentScore.textContent = 0;
    } else if (turn === 1) {
      playerTwoBackground.classList.add('player--winner');
      playerTwoScore.textContent = fullscore;
      playerTwoCurrentScore.textContent = 0;
    }
  }
};

const swapPlayer = player => {
  if (player === 0) {
    playerOneBackground.classList.add('player--active');
    playerTwoBackground.classList.remove('player--active');
  } else if (player === 1) {
    playerTwoBackground.classList.add('player--active');
    playerOneBackground.classList.remove('player--active');
  }
};

const holdPassingValues = () => {
  playerScore[turn] = playerScore[turn] + currentScore;
  if (turn === 0) {
    playerOneCurrentScore.textContent = 0;
    playerOneScore.textContent = playerScore[turn];
    turn = 1;
  } else if (turn === 1) {
    playerTwoCurrentScore.textContent = 0;
    playerTwoScore.textContent = playerScore[turn];
    turn = 0;
  }
  currentScore = 0;
  swapPlayer(turn);
};

const showDice = diceNumber => {
  for (let i = 1; i < 7; i++) {
    if (diceNumber === i) diceImg.src = `dice-${i}.png`;
  }
};

const randomDice = () => {
  const rolledDice = Math.trunc(Math.random() * 6) + 1;
  return rolledDice;
};

const checkWhichPlayer = dice => {
  if (dice === 1 && turn === 0) {
    turn = 1;
    playerOneCurrentScore.textContent = 0;
  } else if (dice === 1 && turn === 1) {
    turn = 0;
    playerTwoCurrentScore.textContent = 0;
  }
  swapPlayer(turn);
};

if (playerScore[0] < 100 && playerScore[1] < 100) {
  rollDice.addEventListener('click', function () {
    printDice();
    const roll = randomDice();
    showDice(roll);
    if (roll === 1) {
      checkWhichPlayer(roll);
      currentScore = 0;
    } else {
      currentScore = currentScore + roll;
      if (turn === 0) {
        playerOneCurrentScore.textContent = currentScore;
      } else if (turn === 1) {
        playerTwoCurrentScore.textContent = currentScore;
      }
    }
    playerWon(roll);
  });
  hold.addEventListener('click', holdPassingValues);
}

newGameBtn.addEventListener('click', startNewGame);
