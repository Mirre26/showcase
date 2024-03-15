

let board = [];
let flagsPlaced = 0; // Counter to track flags placed
let gameOver = false;

// Initialize the board
function initializeBoard() {
    for (let i = 0; i < numRows; i++) {
        board[i] = [];
        for (let j = 0; j < numCols; j++) {
            board[i][j] = {
                isMine: false,
                revealed: false,
                numAdjacentMines: 0
            };
        }
    }

    // Place mines randomly
    let minesPlaced = 0;
    while (minesPlaced < numMines) {
        const row = Math.floor(Math.random() * numRows);
        const col = Math.floor(Math.random() * numCols);
        if (!board[row][col].isMine) {
            board[row][col].isMine = true;
            board[row][col].numAdjacentMines = 'X';
            minesPlaced++;
        }
    }

    // Calculate adjacent mines count
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (!board[i][j].isMine) {
                board[i][j].numAdjacentMines = countAdjacentMines(i, j);
            }
        }
    }
}

// Count adjacent mines
function countAdjacentMines(row, col) {
    let count = 0;
    for (let i = row - 1; i <= row + 1; i++) {
        for (let j = col - 1; j <= col + 1; j++) {
            if (i >= 0 && i < numRows && j >= 0 && j < numCols && board[i][j].isMine) {
                count++;
            }
        }
    }
    return count;
}

// Handle cell click
function cellClicked(row, col) {
    if (!board[row][col].revealed && !gameOver) {
        if (board[row][col].hasFlag) {
            // If cell has a flag, decrement the flagsPlaced counter
            return;
        } else
            if (board[row][col].isMine) {
                revealAllMines();
                stopTimer();
                alert("Game Over!");
                gameOver = true;
            } else {
                revealCell(row, col);
            }
    }


}

// Reveal cell and adjacent cells recursively
function revealCell(row, col) {
    if (board[row][col].revealed) {
        return;
    }

    board[row][col].revealed = true;
    const cellElement = document.getElementById(`cell_${row}_${col}`);
    cellElement.style.backgroundColor = "palegreen";
    cellElement.innerText = board[row][col].numAdjacentMines;
    if (board[row][col].numAdjacentMines === 'X')
        cellElement.style.backgroundColor = "red";
    if (board[row][col].numAdjacentMines === 0) {
        cellElement.style.backgroundColor = "beige";
        // Reveal adjacent cells recursively
        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                if (i >= 0 && i < numRows && j >= 0 && j < numCols && !(i === row && j === col)) {
                    if (!board[i][j].hasFlag)
                    revealCell(i, j);
                }
            }
        }
    }
}


// Render the board
function renderBoard() {
    const boardElement = document.getElementById('displayboard');
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.id = `cell_${i}_${j}`;
            cell.onclick = () => cellClicked(i, j);
            cell.oncontextmenu = (event) => {
                event.preventDefault(); // Prevent default context menu
                if (!gameOver) {
                    displayFlag(i, j); // Call function to display flag
                    checkWinCondition(); // Check win condition after each click
                }
            };
            boardElement.appendChild(cell);
        }
    }
}
// Function to display flag image
function displayFlag(row, col) {
    const cellElement = document.getElementById(`cell_${row}_${col}`);
    if (!board[row][col].revealed) {
        if (board[row][col].hasFlag) {
            // Remove flag if already placed
            cellElement.removeChild(cellElement.querySelector('img'));
            board[row][col].hasFlag = false;
            flagsPlaced--;
        } else if (flagsPlaced !== numMines) {
            // Place flag if not already placed
            const flagImg = document.createElement('img');
            flagImg.src = "frontend/images/Redflag_30.png";
            flagImg.alt = 'Flag';
            cellElement.appendChild(flagImg);
            board[row][col].hasFlag = true;
            flagsPlaced++; // Increment flagsPlaced counter
        } else {
            alert("can't place more flags");
        }
    }
}

function checkWinCondition() {
    if (flagsPlaced === numMines) {
        // Check if all flags are placed on mine cells
        let flagCount = 0;
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                if (board[i][j].isMine && board[i][j].hasFlag) {
                    flagCount++;
                    if (flagCount == numMines) {
                        stopTimer();
                        alert("You won!");
                        gameOver = true;
                        return;
                    }
                    
                }
            }
        }
    }
}

function revealAllMines() {
    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            if (board[i][j].isMine) {
                revealCell(i, j);
            }
        }
    }
}

