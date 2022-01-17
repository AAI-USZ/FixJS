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
            delete this.isDecimalSeparatorPresent;
            break;
          case 'command':
            if (value === '=') {
              this.calculate();
              delete this.isDecimalSeparatorPresent;
            } else if (value === 'C') {
              if (this.stack[this.stack.length-1])
                delete this.isDecimalSeparatorPresent;
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