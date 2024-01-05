const board = document.getElementById('board');
const cells = [];
let currentPlayer = 'X';
let winner = null;

// Create the Tic-Tac-Toe board
for (let i = 0; i < 9; i++) {
  const cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.index = i;
  cell.addEventListener('click', () => makeMove(i));
  board.appendChild(cell);
  cells.push(cell);
}

// Check for a winner after each move
function checkWinner() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (cells[a].innerText && cells[a].innerText === cells[b].innerText && cells[a].innerText === cells[c].innerText) {
      return cells[a].innerText;
    }
  }

  // Check for a tie
  if (![...cells].some(cell => !cell.innerText)) {
    return 'Tie';
  }

  return null;
}

// Handle a player making a move
function makeMove(index) {
  if (!cells[index].innerText && !winner) {
    cells[index].innerText = currentPlayer;
    winner = checkWinner();

    if (winner) {
      displayWinner();
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}

// Display the winner or tie message
function displayWinner() {
  const winnerPopup = document.getElementById('winner-popup');
  const winnerMessage = document.getElementById('winner-message');

  if (winner === 'Tie') {
    winnerMessage.innerText = 'It\'s a Tie!';
  } else {
    winnerMessage.innerText = `Player ${winner} Wins!`;
  }

  winnerPopup.style.display = 'block';
}

// Restart the game
function restartGame() {
  cells.forEach(cell => {
    cell.innerText = '';
  });

  currentPlayer = 'X';
  winner = null;

  document.getElementById('winner-popup').style.display = 'none';
}
