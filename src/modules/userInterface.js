export default class UserInterface {
  constructor() {
    this.rulesDialog = document.querySelector('#rules-dialog');
    this.openRulesButton = document.querySelector('#open-rules-btn');
    this.closeRulesButton = document.querySelector('#close-rules-btn');
  }

  setupEventListeners() {
    this.openRulesButton.addEventListener('click', () =>
      this.rulesDialog.showModal()
    );

    this.closeRulesButton.addEventListener('click', () =>
      this.rulesDialog.close()
    );
  }
}
