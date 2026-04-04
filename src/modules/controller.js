import UserInterface from './userInterface';

export default class Controller {
  constructor() {
    this.ui = new UserInterface();
    this.ui.setupEventListeners();
  }
}
