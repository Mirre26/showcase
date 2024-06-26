function disableAllCells() {
    // Select all buttons within the game container
    var buttons = document.querySelectorAll('#gameContainer button');

    // Iterate through each button and disable it
    buttons.forEach(function (button) {
        button.disabled = true;
    });
}

function revealCell(row, column) {
    var button = $('#cell_' + row + '_' + column);

    // Check if the cell is flagged
    if (!button.prop('disabled')) {
        // Cell is not flagged, proceed to reveal
        button.prop('disabled', true);

        // Send an AJAX request to reveal the cell at the specified row and column
        $.ajax({
            type: "POST",
            url: "/Minesweeper/RevealCell",
            data: { row: row, column: column },
            success: function (response) {
                // Update the UI based on the response
                if (response.success) {
                    // If the cell was successfully revealed, update the UI accordingly
                    var cellValue = response.value;
                    button.text(cellValue);
                    if (cellValue == 9) {

                        $.ajax({
                            type: "POST",
                            url: "/Minesweeper/EndGame",
                            success: function (response) {
                                // Update the UI based on the response
                                if (response.success) {


                                } else {
                                    // Handle the case where the reveal operation failed
                                }
                            },
                            error: function () {
                                // Handle errors that occur during the AJAX request
                            }
                        });
                        stopTimer();
                        alert("game over!!");
                        document.getElementById("lastbutton").style.display = "inline-block";
                        document.getElementById("lastbutton").click();
                        setTimeout(function () {
                            document.getElementById("lastbutton").style.display = "none";
                        }, 0);
                        disableAllCells();
                    }
                } else {
                    disableAllCells();
                    alert(response.message);
                }
            },
            error: function () {
                // Handle errors that occur during the AJAX request
            }
        });
    }
}

var flagsPlaced = 0; // Variable to track the number of flags placed

function flagCell(event, row, column) {
    // Disable context menu to prevent default right-click behavior
    event.preventDefault();

    // Toggle flag on the cell
    var button = $('#cell_' + row + '_' + column);
    if (button.text() === '🚩') {
        // If cell is already flagged, remove flag
        button.text('');
        button.prop('disabled', false); // Enable the button again
        $.ajax({
            type: "POST",
            url: "/Minesweeper/RevealCell",
            data: { row: row, column: column },
            success: function (response) {
                if (response.success) {
                    var cellValue = response.value;
                    if (cellValue == 9) {
                        $.ajax({
                            type: "POST",
                            url: "/Minesweeper/RemoveFlaggedCells",
                            data: { cellValue: cellValue },
                            success: function (response) {
                                // Update the UI based on the response
                                if (response.success) {
                                    alert("Vlag value verlaagd");
                                }
                            }
                        });
                    }
                }
            }
        });
        flagsPlaced--;
    } else if (flagsPlaced < 5 && button.text() == '') { // Check if the maximum flags limit is not reached
        // If cell is not flagged, toggle flag
        button.text('🚩'); // Display flag icon
        button.prop('disabled', true);
        $.ajax({
            type: "POST",
            url: "/Minesweeper/RevealCell",
            data: { row: row, column: column },
            success: function (response) {
                if (response.success) {
                    var cellValue = response.value;
                    if (cellValue == 9) {
                        $.ajax({
                            type: "POST",
                            url: "/Minesweeper/AddFlaggedCells",
                            data: { cellValue: cellValue },
                            success: function (response) {
                                // Update the UI based on the response
                                if (response.success) {
                                   
                                    stopTimer();
                                    alert("gewonnen!!");
                                    document.getElementById("lastbutton").style.display = "inline-block";
                                    document.getElementById("lastbutton").click();
                                    setTimeout(function () {
                                        document.getElementById("lastbutton").style.display = "none";
                                    }, 0);
                                    disableAllCells();

                                } else {
                                    alert("Vlag value verhoogd");
                                }
                            }
                        });
                    }
                }
            }
        });
        flagsPlaced++;

        // Check if all 5 flags are placed
        if (flagsPlaced === 5) {
            // Perform further actions if needed
        }
    }
}




function showGame() {
    $.ajax({
        type: "POST",
        url: "/Minesweeper/StartNewGame",
        success: function (response) {
            // Update the UI based on the response
            if (response.success) {
                // If the cell was successfully revealed, update the UI accordingly
                document.getElementById("newGameButton").style.display = "none";
                var rows = response.rows;
                var columns = response.column;
                // Generate the game board with the retrieved rows and columns
                generateGameBoard(rows, columns);
            } else {
                // Handle the case where the reveal operation failed
            }
        },
        error: function () {
            // Handle errors that occur during the AJAX request
        }
    });
}

// Event listener to handle the click event on the new game button
document.getElementById("newGameButton").addEventListener("click", function () {
    showGame();
});

function generateGameBoard(rows, columns) {
    var gameContainer = document.getElementById("gameContainer");

    // Clear any existing content in the game container
    gameContainer.innerHTML = "";

    // Create buttons for each cell in the game board
    for (var i = 0; i < rows; i++) {
        var rowDiv = document.createElement("div");
        for (var j = 0; j < columns; j++) {
            var button = document.createElement("button");
            button.id = "cell_" + i + "_" + j;
            button.style.width = "50px";
            button.style.height = "50px";
            button.style.border = "1px solid #ccc";
            button.style.textAlign = "center";
            button.style.lineHeight = "50px"; // Adjusted to match button height
            button.style.backgroundColor = "rgb(235, 255, 235)";
            button.style.justifyContent = "center"; // Center horizontally
            button.style.alignItems = "center"; // Center vertically
            button.style.verticalAlign = "middle"; // Keep the button vertically aligned
            button.style.fontSize = "22px";




            // Attach click event for left-click
            button.onclick = function (event) {
                // Handle cell click event
                var idParts = this.id.split("_");
                revealCell(parseInt(idParts[1]), parseInt(idParts[2]));
            };

            // Attach right-click event for flagging
            button.oncontextmenu = function (event) {
                // Handle right-click event
                var idParts = this.id.split("_");
                flagCell(event, parseInt(idParts[1]), parseInt(idParts[2]));
                return false; // Prevent context menu from appearing
            };

            rowDiv.appendChild(button);
        }
        gameContainer.appendChild(rowDiv);
    }
}