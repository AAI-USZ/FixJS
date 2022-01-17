function() {
        if (this._stack) {
          return this._stack;
        } else if (this.sourceId) {
          return this.toString() + '\nat ' + getErrorMessage(this);
        }
        return this.toString() + '\nat unknown';
      }