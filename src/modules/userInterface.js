export default class UserInterface {
  constructor() {
    this.rulesDialog = document.querySelector('#rules-dialog');
    this.openRulesButton = document.querySelector('#open-rules-btn');
    this.closeRulesButton = document.querySelector('#close-rules-btn');
    this.playArea = document.querySelector('.play-area');
  }

  setupDialogListeners() {
    this.openRulesButton.addEventListener('click', () =>
      this.rulesDialog.showModal()
    );

    this.closeRulesButton.addEventListener('click', () =>
      this.rulesDialog.close()
    );
  }

  setupGameboard(player) {
    const div = document.createElement('div');
    div.classList.add('board');
    div.id = `${player.name}`;
    player.gameBoard.grid.forEach((row, rowIndex) => {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('row');
      row.forEach((cell, colIndex) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.setAttribute('rowIndex', `${rowIndex}`);
        cellDiv.setAttribute('colIndex', `${colIndex}`);
        rowDiv.appendChild(cellDiv);
        cellDiv.addEventListener('click', this.handleBoardClick.bind(player));
      });
      div.appendChild(rowDiv);
    });
    this.playArea.appendChild(div);
  }

  handleBoardClick(e) {
    const cellDiv = e.target;
    if (cellDiv.getAttribute('isMarked') === 'yes') return; // if cell already marked do nothing
    cellDiv.setAttribute('isMarked', 'yes');
    const rowIndex = cellDiv.getAttribute('rowIndex');
    const colIndex = cellDiv.getAttribute('colIndex');
    const cell = this.gameBoard.grid[rowIndex][colIndex];
    this.gameBoard.receiveAttack([rowIndex, colIndex]);
    console.log(
      `[${rowIndex}, ${colIndex}] was clicked on ${this.name}'s board.`
    );
    if (cell === -1) {
      console.log('Shot Missed.');
      cellDiv.classList.add('miss');
    } else {
      console.log("It's a hit!");
      cellDiv.classList.add('hit');
      if (this.gameBoard.hasAllShipSunk()) {
        console.log(`${this.name} has lost!`);
        alert(`${this.name} has lost!`);
        this.hasWon = true;
      }
    }
  }

  clearBoard() {
    const playArea = document.querySelector('.play-area');
    playArea.replaceChildren();
  }
}
