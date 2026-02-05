document.addEventListener("DOMContentLoaded", function () {

    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("status");
    const restartBtn = document.getElementById("restart");

    let currentPlayer = "X";
    let gameActive = true;
    let board = ["", "", "", "", "", "", "", "", ""];

    statusText.textContent = "Player X turn";

    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {

            if (!gameActive || board[index] !== "") return;

            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            cell.className="cell " + currentPlayer.toLowerCase();

            if (checkWinner()) {
                statusText.textContent = `Player ${currentPlayer} wins!`;
                statusText.style.color = currentPlayer === "X" ? "#b11212" : "#111";
                gameActive = false;
                return;
            }

            if (!board.includes("")) {
                statusText.textContent = "Draw!";
                gameActive = false;
                return;
            }

            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = `Player ${currentPlayer} turn`;
            statusText.style.color = currentPlayer === "X" ? "#b11212" : "#111";
        });
    });

    function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");

      drawLine(pattern);
      return true;
    }
  }
  return false;
}
function drawLine(pattern) {
  const line = document.getElementById("win-line");
  const game = document.querySelector(".game");

  const first = cells[pattern[0]];
  const last = cells[pattern[2]];

  const g = game.getBoundingClientRect();
  const f = first.getBoundingClientRect();
  const l = last.getBoundingClientRect();

  const x1 = f.left + f.width / 2 - g.left;
  const y1 = f.top + f.height / 2 - g.top;
  const x2 = l.left + l.width / 2 - g.left;
  const y2 = l.top + l.height / 2 - g.top;

  const length = Math.hypot(x2 - x1, y2 - y1);
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

  line.style.width = length + "px";
  line.style.transform = translate(${x1}px, ${y1}px) rotate(${angle}deg);
}
    restartBtn.addEventListener("click", () => {
        board = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        statusText.textContent = "Player X turn";

document.getElementById("win-line").style.width = "0";
cells.forEach(cell => cell.classList.remove("win"));

        cells.forEach(cell => {
          cell.textContent = "";
          cell.className = "cell";
});
    });

});
