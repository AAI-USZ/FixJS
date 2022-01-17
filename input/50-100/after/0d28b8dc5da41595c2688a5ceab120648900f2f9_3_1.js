function calculator_appendValue(value) {

    // To avoid decimal separator repetition
    if (value === '.' && this.isDecimalSeparatorPresent)
      return;
    else if (value === '.')
      this.isDecimalSeparatorPresent = true;

    if (this.toClear) {
      this.stack = [];
      this.toClear = false;
    }
    this.stack.push(value);
    this.updateDisplay();
  }