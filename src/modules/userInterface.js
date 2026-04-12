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
    this.p1RandomizeButton = document.querySelector(
      '#player-one>button.randomize-btn'
    );
    this.p2RandomizeButton = document.querySelector(
      '#player-two>button.randomize-btn'
    );
    this.hideButton = document.querySelector('#hide-btn');
    this.instructionDialog = document.querySelector('#instructions-dialog');
    this.closeInstructionsButton = document.querySelector(
      '#close-instructions-btn'
    );
  }

  setupDialogListeners() {
    this.openRulesButton.addEventListener('click', () =>
      this.rulesDialog.showModal()
    );

    this.closeRulesButton.addEventListener('click', () =>
      this.rulesDialog.close()
    );
  }

  setupButtonListeners(startGame, randomize) {
    this.gameSetupForm.addEventListener('submit', () => {
      this.clearPlayArea();
      const formData = new FormData(this.gameSetupForm);
      const p1name = formData.get('p1name');
      const p2name = formData.get('p2name');
      const p2type = formData.get('p2type');
      startGame(p1name, p2name, p2type);
    });

    this.resetButton.addEventListener('click', () => {
      console.log('Reset Game');
      this.winnerDialog.close();
      this.clearPlayArea();
      const formData = new FormData(this.gameSetupForm);
      const p1name = formData.get('p1name');
      const p2name = formData.get('p2name');
      const p2type = formData.get('p2type');
      startGame(p1name, p2name, p2type);
    });

    this.newGameButton.addEventListener('click', () => {
      this.winnerDialog.close();
      this.openSettings();
    });

    this.p1RandomizeButton.addEventListener('click', () => {
      randomize('player-one');
    });

    this.p2RandomizeButton.addEventListener('click', () => {
      randomize('player-two');
    });

    this.hideButton.addEventListener('click', () => {
      const shipCells = document.querySelectorAll('[isShip="yes"]');
      shipCells.forEach((shipCell) => {
        shipCell.classList.remove('visibility');
      });
    });

    this.closeInstructionsButton.addEventListener('click', () => {
      this.instructionDialog.close();
    });
  }

  openSettings() {
    this.gameSetupDialog.showModal();
  }

  openInstructions() {
    this.instructionDialog.showModal();
  }

  async renderShips(playerID) {
    const shipsDiv = document.querySelector(`#${playerID}>div.ships-div`);
    for (let i = 0; i < 5; i++) {
      const img = document.createElement('img');
      await import(`../../assets/ship-0${i + 1}.png`).then((imgObj) => {
        img.src = imgObj.default;
        img.classList.add('active');
        img.setAttribute('playerID', playerID);
        img.setAttribute('idx', i);
      });
      shipsDiv.appendChild(img);
    }
  }

  toggleShipVisibility(playerID) {
    const shipCells = document.querySelectorAll(`#${playerID} [isShip="yes"]`);
    shipCells.forEach((shipCell) => {
      shipCell.classList.toggle('visibility');
    });
  }

  disableRandomizeButton(playerID) {
    const btn = document.querySelector(`#${playerID}>button.randomize-btn`);
    btn.disabled = true;
  }

  enableRandomizeButton(playerID) {
    const btn = document.querySelector(`#${playerID}>button.randomize-btn`);
    btn.disabled = false;
  }

  renderGameboard(
    playerID,
    name,
    grid,
    playHumanRound,
    whoseTurn,
    checkAllReady
  ) {
    const boardDiv = document.querySelector(`#${playerID}>div.board-div`);
    boardDiv.replaceChildren();
    const playerPara = document.querySelector(`#${playerID}>p.player-para`);
    playerPara.textContent = name;
    grid.forEach((row, rowIndex) => {
      const rowDiv = document.createElement('div');
      rowDiv.classList.add('row');
      row.forEach((cell, colIndex) => {
        const cellDiv = document.createElement('div');
        cellDiv.classList.add('cell');
        cellDiv.setAttribute('rowIndex', `${rowIndex}`);
        cellDiv.setAttribute('colIndex', `${colIndex}`);
        if (cell === -1) {
          cellDiv.setAttribute('isShip', 'no');
        } else {
          cellDiv.setAttribute('isShip', 'yes');
        }
        rowDiv.appendChild(cellDiv);
        cellDiv.addEventListener('click', (e) => {
          if (
            whoseTurn() === name || // a player can't click on their own cell
            checkAllReady() === false || // atleast one player has not finished placing ships
            cellDiv.getAttribute('isMarked') === 'yes' // if cell already marked do nothing
          )
            return;
          cellDiv.setAttribute('isMarked', 'yes');
          playHumanRound(rowIndex, colIndex);
        });
      });
      boardDiv.appendChild(rowDiv);
    });
  }

  repaintCell(playerID, x, y) {
    const boardDiv = document.querySelector(`#${playerID}>div.board-div`);
    const rows = [...boardDiv.children];
    rows.forEach((row, i) => {
      const cells = [...row.children];
      cells.forEach((cell, j) => {
        if (i == x && j == y) {
          const rowIndex = parseInt(cell.getAttribute('rowIndex'));
          const colIndex = parseInt(cell.getAttribute('colIndex'));
          console.log(`Marking cell [${rowIndex}, ${colIndex}]`);
          if (cell.getAttribute('isShip') === 'yes') {
            cell.classList.add('hit');
          } else {
            cell.classList.add('miss');
          }
        }
      });
    });
  }

  showPlayerTurn(name) {
    this.playerTurnHeader.textContent = `It is ${name}'s turn.`;
  }

  openWinnerDialog(name) {
    this.winnerHeader.textContent = `${name} Wins!`;
    this.winnerDialog.showModal();
  }

  clearPlayArea() {
    const boardDivs = document.querySelectorAll('.board-div');
    const shipDivs = document.querySelectorAll('.ships-div');
    boardDivs.forEach((div) => {
      div.replaceChildren();
    });
    shipDivs.forEach((div) => {
      div.replaceChildren();
    });
  }
}
