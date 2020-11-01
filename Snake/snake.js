import { getInputDirection } from "./input.js";
export const snake_speed = 12; //It is how many times the snake moves per second
let newSegment = 0;
const snakeBody = [{ x: 10, y: 11 }];
export function update() {
  addSegment();
  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }
  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}
export function draw(gameBoard) {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;
    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
}
export function getSnakeHead() {
  return snakeBody[0];
}
export function getIntersection() {
  return snakeBody.some((segment, index) => {
    if (index !== 0) {
      return equalPositions(snakeBody[0], segment);
    }
  });
}
export function expandSnake(amount) {
  newSegment += amount;
}
export function onSnake(position) {
  return equalPositions(snakeBody[0], position);
}
function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}
function addSegment() {
  for (let i = 0; i < newSegment; i++) {
    snakeBody.push({ ...snakeBody[snakeBody[i]] });
    //or
    //snakeBody.push(snakeBody[snakeBody[i]]);
    // So the last snack node will be added to the end
  }
  newSegment = 0; // So it will not increase only if it eat a food so newSegment will increase by one
}
