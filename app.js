let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetbtn");
let newBtn = document.querySelector("#newbtn");
let msgContainer = document.querySelector(".msgcontainer");
let Msg = document.querySelector("#msg");

let turnO = false;
let movesO = []; // Track 'O' player moves
let movesX = []; // Track 'X' player moves

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handleMove(box, index);
  });
});

const handleMove = (box, index) => {
  removeHighlight();
  if (turnO) {
    box.innerText = "O";
    movesO.push(index);
    if (movesO.length > 3) {
      highlightNextElimination(movesX);
      eliminateFirstMove(movesO);
    }
    turnO = false;
  } else {
    box.innerText = "X";
    movesX.push(index);
    if (movesX.length > 3) {
      highlightNextElimination(movesO);
      eliminateFirstMove(movesX);
    }
    turnO = true;
  }
  box.disabled = true;
  checkWinnerOrContinue();
};

const resetGame = () => {
  turnO = true;
  movesO = [];
  movesX = [];
  enableBoxes();
  msgContainer.classList.add("hide");
  removeHighlight();
};

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (winner) => {
  Msg.innerText = `Congratulations, winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinnerOrContinue = () => {
  if (checkWinner()) {
    return;
  }
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1val = boxes[pattern[0]].innerText;
    let pos2val = boxes[pattern[1]].innerText;
    let pos3val = boxes[pattern[2]].innerText;

    if (pos1val != "" && pos2val != "" && pos3val != "") {
      if (pos1val === pos2val && pos2val === pos3val) {
        showWinner(pos1val);
        return true;
      }
    }
  }
  return false;
};

const eliminateFirstMove = (moves) => {
  let firstMoveIndex = moves.shift(); // Remove the first move
  boxes[firstMoveIndex].innerText = ""; // Empty that box
  boxes[firstMoveIndex].disabled = false; // Enable that box
};

const highlightNextElimination = (moves) => {
  if (moves.length > 0) {
    let nextEliminationIndex = moves[0];
    boxes[nextEliminationIndex].classList.add("highlight");
  }
};

const removeHighlight = () => {
  boxes.forEach((box) => {
    box.classList.remove("highlight");
  });
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
