var container = document.querySelector(".cardfield");

var body = document.querySelector("body");

body.style.cssText =
  "background-image: url('image/palm.png');background-repeat: no-repeat; background-position: 50% 50%; background-size: 100%";

let hasFlippedCard = false;
let block = false;
let firstCard, secondCard;
var victory = false;

var Card = function(img, framework) {
  return `
  <div class = "card" data-framework = "${framework}">
      <img class="flip-box-front" src= "${img}">
     <img class = "flip-box-back" src = "image/ligth.png">
  </div>
  `;
};

var cardsArr = [
  "image/apple.png",
  "image/butterfly.png",
  "image/pineapple.png",
  "image/strawberries.png",
  "image/hedgehog.png",
  "image/sunflower.png"
];

var cardsImages = cardsArr.concat(cardsArr);

var myCards = cardsImages.map(img => {
  return Card(img, img.slice(6, 11));
});
container.innerHTML = myCards.join("");

var allCards = document.querySelectorAll(".card");

function flipCard() {
  if (block) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  hasFlippedCard = false;
  secondCard = this;

  checkForMatch();
  victoryGame();
}

function checkForMatch() {
  var Match = firstCard.dataset.framework === secondCard.dataset.framework;
  Match ? removeEvent() : clearFlip();
}

function removeEvent() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function clearFlip() {
  block = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function victoryGame() {
  var Arr = [];
  allCards.forEach(element => {
    if (element.classList == "card flip") {
      Arr.push(element);
      return Arr;
    }
  });
  if (Arr.length === allCards.length) {
    // container.classList.add("allClear");
    allCards.forEach(value => value.remove());
    container.style.cssText =
      "background-image:url('https://i.gifer.com/2Gf.gif');background-repeat: no-repeat; background-position: 50% 50%; background-size: 100%; z-index:1";
  }
}

function resetBoard() {
  [hasFlippedCard, block] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function differentOrder() {
  allCards.forEach(card => {
    let randomPosition = Math.floor(Math.random() * 12);
    card.style.order = randomPosition;
  });
})();

allCards.forEach(card => card.addEventListener("click", flipCard));
