const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let disableClick = false;
let score = 0;
const scoreTrack = document.querySelector('h3');

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;

    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  if(disableClick) return;
  if(event.target.classList.contains("flipped")) return;

  let clickedCard = event.target;
  clickedCard.style.backgroundColor = clickedCard.classList[0];

  if(!card1 || !card2) {
    clickedCard.classList.add("flipped");
    card1 = card1 || clickedCard;
    card2 = clickedCard === card1 ? null : clickedCard;
  }

  if(card1 && card2) {
    disableClick = true;

    if (card1.className === card2.className) {
      cardsFlipped += 2;
      card1.removeEventListener("click", handleCardClick);
      card2.removeEventListener("click", handleCardClick);
      card1 = null;
      card2 = null;
      disableClick = false;
    } else {
      setTimeout(function() {
        card1.style.backgroundColor = "";
        card2.style.backgroundColor = "";
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1 = null;
        card2 = null;
        disableClick = false;
      }, 1000);
    }
    score++;
    scoreTrack.innerText = `Score: ${score}`;
  }

  if (cardsFlipped === COLORS.length) alert("You Win!");
}

createDivsForColors(shuffledColors);