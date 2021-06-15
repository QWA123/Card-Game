// code for GAME Logic

// if You want to use import/export functionalities Do " type="module" " in script tag of HTML

import Deck from "./deck.js";

const CARD_VALUE_MAP = {
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  10: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

let computerCardSlot = document.querySelector(".computer-card-slot");
let playerCardSlot = document.querySelector(".player-card-slot");
let computerDeckElement = document.querySelector(".computer-deck");
let playerDeckElement = document.querySelector(".player-deck");
let text = document.querySelector(".text");

let playerDeck, computerDeck;

let inRound, stop; // tells us if the cards are currently Flipped Or Not

document.addEventListener("click", () => {
  if (stop) {
    // if we Click after Winning or Loosing the Game Restarts
    startGame();
    return; // so we dont run any further code in this body
  }
  if (inRound) {
    // currently in Our cards are in Flipped state so this click was meant to Hide them back
    clearBeforeRound();
  } else {
    flipCards();
  }
});

startGame();

function startGame() {
  const deck = new Deck();
  deck.shuffle();

  let midP = Math.floor(deck.numberOfCards / 2);

  playerDeck = new Deck(deck.cards.slice(0, midP));
  computerDeck = new Deck(deck.cards.slice(midP));

  console.log(playerDeck);
  console.log(computerDeck);

  stop = false;
  clearBeforeRound();
}

function clearBeforeRound() {
  inRound = false; // cards are in hidden state
  computerCardSlot.innerHTML = "";
  playerCardSlot.innerHTML = "";
  text.innerText = "";

  updateDeckCount();
}

function updateDeckCount() {
  computerDeckElement.innerText = computerDeck.numberOfCards;
  playerDeckElement.innerText = playerDeck.numberOfCards;
}

function flipCards() {
  inRound = true;

  const playerCard = playerDeck.pop(); // playerDeck is an Object not Array so pop() dont work so we make our custom pop
  const computerCard = computerDeck.pop();

  updateDeckCount();

  playerCardSlot.appendChild(playerCard.getHTML());
  computerCardSlot.appendChild(computerCard.getHTML());

  if (isRoundWinner(playerCard, computerCard)) {
    text.innerText = "Win";
    playerDeck.push(playerCard);
    playerDeck.push(computerCard);
  } else if (isRoundWinner(computerCard, playerCard)) {
    text.innerText = "Lose";
    computerDeck.push(playerCard);
    computerDeck.push(computerCard);
  } else {
    text.innerText = "Draw";
    computerDeck.push(computerCard);
    playerDeck.push(playerCard);
  }

  if (isGameOver(playerDeck)) {
    text.innerText = "You Lose!!";
    stop = true;
  }
  if (isGameOver(computerDeck)) {
    text.innerText = "You Win!!";
    stop = true;
  }
}

function isRoundWinner(cardOne, cardTwo) {
  return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]; // return True if Card1 Won
}

function isGameOver(deck) {
  return deck.numberOfCards == 0;
}
