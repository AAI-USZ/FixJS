function calculator_calculate() {
    if (this.stack.length === 0)
      return;

    try {
      var postfix =
        this.infix2postfix(this.stack.map(this.substitute).join(''));
      var result = this.evaluatePostfix(postfix);
      this.stack = [this.formatNumber(result)];
      this.updateDisplay();
      this.toClear = true;
    } catch (err) {
      this.display.parentNode.classList.add('error');
      if (this.errorTimeout === null) {
        this.errorTimeout = window.setTimeout(function calc_errorTimeout(self) {
          self.display.parentNode.classList.remove('error');
          self.errorTimeout = null;
        }, 300, this);
      }
    }
  }