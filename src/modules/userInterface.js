export default class UserInterface {
  constructor() {
    this.rulesDialog = document.querySelector('#rules-dialog');
    this.openRulesButton = document.querySelector('#open-rules-btn');
    this.closeRulesButton = document.querySelector('#close-rules-btn');
    this.playArea = document.querySelector('.play-area');
    this.gameSetupDialog = document.querySelector('#game-setup-dialog');
    this.gameSetupForm = document.querySelector('#game-setup-form');
    this.playerTurnHeader = document.querySelector('.player-turn-header');
    this.winnerDialog = document.querySelector('.winner-dialog');
    this.winnerHeader = document.querySelector('.winner-header');
    this.resetButton = document.querySelector('#reset-btn');
    this.newGameButton = document.querySelector('#new-game-btn');
  }

  setupDialogListeners(startGame) {
    this.openRulesButton.addEventListener('click', () =>
      this.rulesDialog.showModal()
    );

    this.closeRulesButton.addEventListener('click', () =>
      this.rulesDialog.close()
    );

    this.gameSetupForm.addEventListener('submit', () => {
      this.clearPlayArea();
      const formData = new FormData(this.gameSetupForm);
      const p1name = formData.get('p1name');
      const p1type = formData.get('p1type');
      const p2name = formData.get('p2name');
      const p2type = formData.get('p2type');
      startGame(p1name, p1type, p2name, p2type);
    });

    this.resetButton.addEventListener('click', () => {
      console.log('Reset Game');
      this.winnerDialog.close();
      this.clearPlayArea();
      const formData = new FormData(this.gameSetupForm);
      const p1name = formData.get('p1name');
      const p1type = formData.get('p1type');
      const p2name = formData.get('p2name');
      const p2type = formData.get('p2type');
      startGame(p1name, p1type, p2name, p2type);
    });

    this.newGameButton.addEventListener('click', () => {
      this.winnerDialog.close();
      this.openSettings();
    });
  }

  openSettings() {
    this.gameSetupDialog.showModal();
  }

  renderGameboard(name, grid, playHumanRound, whoseTurn) {
    const div = document.createElement('div');
    div.classList.add('board');
    div.id = name;
    const p = document.createElement('p');
    p.textContent = name;
    div.appendChild(p);
    grid.forEach((row, rowIndex) => {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('row');
      row.forEach((cell, colIndex) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.setAttribute('rowIndex', `${rowIndex}`);
        cellDiv.setAttribute('colIndex', `${colIndex}`);
        rowDiv.appendChild(cellDiv);
        cellDiv.addEventListener('click', (e) => {
          if (
            whoseTurn() === name || // a player can't click on their own cell
            cellDiv.getAttribute('isMarked') === 'yes' // if cell already marked do nothing
          )
            return;
          cellDiv.setAttribute('isMarked', 'yes');
          if (cell == -1) {
            cellDiv.classList.add('miss');
          } else {
            cellDiv.classList.add('hit');
          }
          playHumanRound(rowIndex, colIndex);
        });
      });
      div.appendChild(rowDiv);
    });
    this.playArea.appendChild(div);
  }

  showPlayerTurn(name) {
    this.playerTurnHeader.textContent = `It is ${name}'s turn.`;
  }

  openWinnerDialog(name) {
    this.winnerHeader.textContent = `${name} Wins!`;
    this.winnerDialog.showModal();
  }

  clearPlayArea() {
    const playArea = document.querySelector('.play-area');
    playArea.replaceChildren();
  }
}
