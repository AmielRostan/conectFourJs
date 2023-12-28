const Screen = require("./screen");

class Cursor {

  constructor(numRows, numCols) {
    this.numRows = numRows;
    this.numCols = numCols;

    this.row = 0;
    this.col = 0;

    this.gridColor = 'black';
    this.cursorColor = 'yellow';

  }

  resetBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.gridColor);
  }

  setBackgroundColor() {
    Screen.setBackgroundColor(this.row, this.col, this.cursorColor);
  }

  down() {
    if (this.row < 5) {
      this.resetBackgroundColor();
      this.row++;
      this.setBackgroundColor();
      Screen.render();
    }
  }

  up() {
    if (this.row > 0) {
      this.resetBackgroundColor();
      this.row--;
      this.setBackgroundColor();
      Screen.render();
    }
  }

  left() {
    if (this.col > 0) {
      this.resetBackgroundColor();
      this.col--;
      this.setBackgroundColor();
      Screen.render();
    }
  }

  right() {
    if (this.col < 6) {
      this.resetBackgroundColor();
      this.col++;
      this.setBackgroundColor();
      Screen.render();
    }
  }
}


module.exports = Cursor;
