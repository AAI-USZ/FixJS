function calculator_backSpace() {
    this.clearBackspaceTimeout();
    this.startBackspaceTimeout();
    this.stack = this.stack.slice(0, -1);
    this.updateDisplay();
  }