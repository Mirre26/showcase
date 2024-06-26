

let timerInterval; // Variable to store the interval ID of the timer
let seconds = 0; // Variable to track the elapsed time

document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("newGameButton");

    startButton.addEventListener("click", function () {
        // Hide the button
        startButton.style.display = "none";
        // Show the board
        timer.style.display = "flex";
        startTimer();
    });
});

function startTimer() {
    timerInterval = setInterval(() => {
        seconds++;
        // Update the timer display
        document.getElementById("timerContent").innerText = formatTime(seconds);
    }, 1000);
}

function stopTimer() {
    
    $.ajax({
        type: "POST",
        url: "/Minesweeper/AddHighscore",
        data: { seconds: seconds },
        success: function (response) {
            // Update the UI based on the response
            if (response.success) {

                console.log("score is geworden: " + response.highscores);

            } else {
                alert("doet het niet");
            }
        }
    });

    $.ajax({
        type: "POST",
        url: "/Minesweeper/DisplayHighscore",
        data: { seconds: seconds },
        success: function (response) {
            // Update the UI based on the response
            if (response.success) {

                alert("je score is: " + response.score);

            } else {
                alert("doet het niet");
            }
        }
    });
    clearInterval(timerInterval);
    timer.style.backgroundColor = "#4d0606";
    timer.style.color = "salmon";
    



}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

