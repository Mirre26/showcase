const numRows = 10;
const numCols = 10;
const numMines = 14;

document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startButton");
    const displayBoard = document.getElementById("displayboard");

    startButton.addEventListener("click", function() {
        // Hide the button
        startButton.style.display = "none";
        // Show the board
        displayBoard.style.display = "grid";
        document.createElement("br");
        // Initialize and render the board
        initializeBoard();
        renderBoard();
    });
});