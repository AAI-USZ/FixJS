function calculator_backSpace() {
    this.clearBackspaceTimeout();
    this.startBackspaceTimeout();
    this.stack.splice(this.stack.length - 1, 1);
    this.updateDisplay();
  }