function calculator_handleEvent(evt) {
    switch (evt.type) {
      case 'mousedown':
        var value = evt.target.value;
        switch (evt.target.dataset.type) {
          case 'value':
            this.appendValue(value);
            break;
          case 'operator':
            this.appendOperator(value);
            break;
          case 'command':
            if (value === '=') {
              this.calculate();
            } else if (value === 'C') {
              this.backSpace();
            } else if (value === 'TIP') {
              this.showTip();
            }
            break;
          case 'close':
            this.tip.classList.remove('show');
            break;
        }
        break;

      case 'mouseup':
        this.clearBackspaceTimeout();
        break;
    }
  }