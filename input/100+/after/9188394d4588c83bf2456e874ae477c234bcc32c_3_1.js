function calculator_updateDisplay() {
    if (this.stack.length === 0) {
      this.display.innerHTML = '0';
      return;
    }
    var infinite = new RegExp((1 / 0) + '', 'g');
    var outval = this.stack.join('').replace(infinite, '∞');
    this.display.innerHTML = outval;
    var valWidth = this.display.offsetWidth;
    var screenWidth = this.display.parentNode.offsetWidth;
    var scaleFactor = Math.min(1, screenWidth / valWidth);
    this.display.style.MozTransform = 'scale(' + scaleFactor + ')';
  }