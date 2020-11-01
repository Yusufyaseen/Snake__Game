import {
  update as updateGame,
  draw as drawGame,
  snake_speed,
  getSnakeHead,
  getIntersection,
} from "./snake.js";
import { outsideGrid } from "./grid.js";
import { draw as drawFood, update as updateFood, score } from "./food.js";
const gameBoard = document.getElementById("gameBoard");
let gameOver = false;
let lastTimeRender = 0;
function main(currentTime) {
  if (gameOver) {
    if (confirm(`You lost the game.! and Your score is ${score}`))
      location.reload();

    return; // Not to run the rest of the code
  }
  window.requestAnimationFrame(main); // It loop(recall) the function over and over .... again for ever !<<( It is the purpose of the game )>>!
  const seconds = (currentTime - lastTimeRender) / 1000; // It is the delay foreach render
  if (seconds < 1 / snake_speed) return;
  console.log("render");

  lastTimeRender = currentTime;
  update();
  draw();
}
window.requestAnimationFrame(main);
function update() {
  updateGame();
  updateFood();
  checkForDeath();
}
function draw() {
  gameBoard.innerText = "";
  drawGame(gameBoard);
  drawFood(gameBoard);
}
function checkForDeath() {
  gameOver = outsideGrid(getSnakeHead()) || getIntersection();
}
