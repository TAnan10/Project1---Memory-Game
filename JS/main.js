const tilesContainer = document.querySelector(".tiles"); // This is the tiles div that contains all the individual tiles
const colors = ["rgb(255, 0, 0)", "rgb(255, 255, 0)", "rgb(0, 0, 255)", "rgb(0, 0, 0)", "rgb(0, 128, 0)", "rgb(255, 255, 255)"]; // Array of possible colors
const colorsPickList = [...colors, ...colors, ...colors, ...colors]; // This is the spread operator which doubles the individual elements in the colors array. So now we have the elements aqua through to teal two times.
const tileCount = colorsPickList.length; // tileCount is now 16 because colorsPickList has 16 elements

// Game State
let revealedRedCount = 0;
let revealedYellowCount = 0;
let revealedGreenCount = 0;
let revealedBlueCount = 0;
let revealedWhiteCount = 0;
let revealedBlackCount = 0;
let awaitingEndOfMove = false;

// Color button Generator
const buttonColor = document.querySelector("aside button");
const divColor = document.querySelector(".randomColor");

buttonColor.addEventListener("click", () => {
  const randomColor = Math.floor(Math.random() * colors.length);
  divColor.style.backgroundColor = colors[randomColor];
});
// Color button Generator

// Game Loop
function buildTile(color) {
  const element = document.createElement("div");
  element.classList.add("tile");
  element.setAttribute("data-color", color);
  element.setAttribute("data-revealed", "false"); // The second argument is the value
  element.addEventListener("click", () => {
    const revealed = element.getAttribute("data-revealed");
    if (awaitingEndOfMove || revealed === "true") {
      return; // By putting return it exits out of the listener function
    }
    element.style.backgroundColor = color;

    // Check for match
    const backgroundColor = getComputedStyle(document.querySelector(".randomColor")).backgroundColor;

    if (backgroundColor === color) {
      awaitingEndOfMove = false;
      element.style.backgroundColor = color;

      if (backgroundColor === "rgb(255, 0, 0)") { // Red
        revealedRedCount += 1;
      }

      if (backgroundColor === "rgb(255, 255, 0)") { // Yellow
        revealedYellowCount += 1;
      }

      if (backgroundColor === "rgb(0, 0, 255)") { // Blue
        revealedBlueCount += 1;
      }

      if (backgroundColor === "rgb(0, 0, 0)") {  // Black
        revealedBlackCount += 1;
      }

      if (backgroundColor === "rgb(0, 128, 0)") { // Green
        revealedGreenCount += 1;
      }

      if (backgroundColor === "rgb(255, 255, 255)") { // White
        revealedWhiteCount += 1;
      }

      if (revealedRedCount === 4 ||  revealedYellowCount === 4 || revealedBlueCount === 4 || revealedBlackCount === 4 || revealedGreenCount === 4 || revealedWhiteCount === 4) {
        alert("You Win!!! Refresh to restart the game");
      }

      return;
    }

    console.log(revealedRedCount);
    console.log(revealedYellowCount);
    console.log(revealedBlueCount);
    console.log(revealedBlackCount);
    console.log(revealedGreenCount);
    console.log(revealedWhiteCount);

    // When player has already clicked on a tile
    awaitingEndOfMove = true;

    setTimeout(() => {
      element.style.backgroundColor = null;
      alert("Generate New Color");
    }, 1000);

    setTimeout(() => {
      awaitingEndOfMove = false;
    }, 3000)
  });

  return element;
}
// Game Loop

// Build up tiles
for (let i = 0; i < tileCount; i++) {
  const randomIndex = Math.floor(Math.random() * colorsPickList.length); // Gets random number from 1 to 16
  const color = colorsPickList[randomIndex]; // The number that's stored in randomIndex will be the index in colorsPickList
  const tile = buildTile(color);
  colorsPickList.splice(randomIndex, 1);
  tilesContainer.appendChild(tile);
}
// Build up tiles

// Help button
const help = document.querySelector(".help");
const instruction = document.querySelector(".instruction");

help.addEventListener("click", () => {
  help.classList.toggle("menu");
  instruction.classList.toggle("view");
})

// Help button