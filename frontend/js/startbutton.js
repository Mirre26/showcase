const numRows = 10;
const numCols = 10;
const numMines = 14;
let timerInterval; // Variable to store the interval ID of the timer
let seconds = 0; // Variable to track the elapsed time

document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startButton");
    const displayBoard = document.getElementById("displayboard");

    startButton.addEventListener("click", function() {
        // Hide the button
        startButton.style.display = "none";
        // Show the board
        displayBoard.style.display = "grid";
        //show the timer
        timer.style.display = "flex";
        startTimer();
        document.createElement("br");
        // Initialize and render the board
        initializeBoard();
        renderBoard();
    });
});

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        // Update the timer display
        document.getElementById("timer").innerText = formatTime(seconds);
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timer.style.backgroundColor= "#4d0606";
    timer.style.color = "salmon";

}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

