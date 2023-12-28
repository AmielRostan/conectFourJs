const Screen = require("./screen");
const Cursor = require("./cursor");

class ConnectFour {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' '],
                 [' ',' ',' ',' ',' ',' ',' ']]

    this.cursor = new Cursor(6, 7);

    // Initialize a 6x7 connect-four grid
    Screen.initialize(6, 7);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('w', 'Move 1 cell up', () => this.cursor.up());
    Screen.addCommand('a', 'Move 1 cell left', () => this.cursor.left());
    Screen.addCommand('d', 'Move 1 cell right', () => this.cursor.right());
    Screen.addCommand('s', 'Move 1 cell down', () => this.cursor.down());

    Screen.addCommand('e', 'Place a move', () => this.placeMove());

    this.cursor.setBackgroundColor();
    Screen.render();
  }

  // Remove this
  placeMove() {
    if (this.grid[this.cursor.row][this.cursor.col] === ' ') {
      Screen.setGrid(this.cursor.row, this.cursor.col, this.playerTurn);
      this.grid[this.cursor.row][this.cursor.col] = this.playerTurn;
      Screen.render();
      if (this.playerTurn === 'O') {
        this.playerTurn = 'X';
      } else {
        this.playerTurn = 'O';
      }
      const winner = ConnectFour.checkWin(this.grid);
      if(winner !== false) {
        ConnectFour.endGame(winner);
      }
    } else {
      console.log('You cant place a move in a cell that is already taken.')
    }
  }

  static checkWin(grid) {
    const rows = grid.length;
    const cols = grid[0].length;
    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // verifying the horizontal lines:
    for(let row = 0; row < rows; row++) {
      for(let col = 0; col < cols - 3; col++) {
        if(grid[row][col] !== ' ' &&
          grid[row][col] === grid[row][col + 1] &&
          grid[row][col] === grid[row][col + 2] &&
          grid[row][col] === grid[row][col + 3]) {
          return grid[row][col];
        }
      }
    }
    // verifying the vertical lines:
    for(let col = 0; col < cols; col++) {
      for(let row = 0; row < rows - 3; row++) {
        if(grid[row][col] !== ' ' &&
          grid[row][col] === grid[row + 1][col] &&
          grid[row][col] === grid[row + 2][col] &&
          grid[row][col] === grid[row + 3][col]) {
          return grid[row][col];
        }
      }
    }
    // verifying the diagonal-up lines:
    for(let row = 3; row < rows; row++) {
      for(let col = 0; col < cols - 3; col++) {
        if(grid[row][col] !== ' ' &&
          grid[row][col] === grid[row - 1][col + 1] &&
          grid[row][col] === grid[row - 2][col + 2] &&
          grid[row][col] === grid[row - 3][col + 3]) {
          return grid[row][col];
        }
      }
    }
    // verifying the diagonal-down lines:
    for(let row = 0; row < rows - 3; row++) {
      for(let col = 0; col < cols - 3; col++) {
        if(grid[row][col] !== ' ' &&
          grid[row][col] === grid[row + 1][col + 1] &&
          grid[row][col] === grid[row + 2][col + 2] &&
          grid[row][col] === grid[row + 3][col + 3]) {
          return grid[row][col];
        }
      }
    }
    // Return false if the game has not ended
    for(let row = 0; row < rows; row++) {
      for(let col = 0; col < cols; col++) {
        if(grid[row][col] === ' ') {
          return false;
        }
      }
    }

    // Return 'T' if the game is a tie
    return 'T';
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}

module.exports = ConnectFour;
