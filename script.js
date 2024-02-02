document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const restartBtn = document.getElementById("restartBtn");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", () => handleCellClick(i));
        board.appendChild(cell);
    }

    function handleCellClick(index) {
        if (gameBoard[index] === "" && !checkWinner()) {
            gameBoard[index] = currentPlayer;
            renderBoard();
            if (checkWinner()) {
                alert('Player ${currentPlayer} wins!');
            } else if (!gameBoard.includes("") && !checkWinner()) {
                alert("It's a draw!");
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
            }
        }
    }

    function renderBoard() {
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell, index) => {
            cell.textContent = gameBoard[index];
        });
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }

        return false;
    }

    restartBtn.addEventListener("click", () => {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        currentPlayer = "X";
        renderBoard();
    });
});