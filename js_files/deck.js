// code for DECK only

const SUITS = ["♠", "♥", "♦", "♣"];
const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

export default class Deck {
  constructor(cards = freshDeck()) {
    // default given

    this.cards = cards;
  }
  pop() {
    return this.cards.shift(); // removes a card from front of array ie top of deck and returns it
  }

  push(card) {
    return this.cards.push(card); // push card to back of array ie bottom of deck
  }

  get numberOfCards() {
    return this.cards.length;
  }

  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      let newIndex = Math.floor(Math.random() * (i + 1)); // 0 to i
      let oldValue = this.cards[newIndex];
      this.cards[newIndex] = this.cards[i];
      this.cards[i] = oldValue;
    }
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit;
    this.value = value;
  }

  get color() {
    return this.suit === "♠" || this.suit === "♣" ? "black" : "red";
  }

  getHTML() {
    const carDiv = document.createElement("div");
    carDiv.innerText = this.suit;
    carDiv.classList.add("card", this.color);
    carDiv.dataset.value = `${this.value} ${this.suit}`;
    // use backTicks ie ` when using dollar sign thing ie "String Interpolation"
    return carDiv;
  }
}

function freshDeck() {
  return SUITS.flatMap((suit) => {
    return VALUES.map((value) => {
      return new Card(suit, value);
    });
  });
}
