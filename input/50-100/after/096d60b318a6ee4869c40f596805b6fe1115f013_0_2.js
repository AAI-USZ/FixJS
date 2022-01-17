function() {
        if (this._stack) {
          return this._stack;
        } else if (this.fileName || this.sourceId) {
          return this.toString() + '\nat ' + getErrorMessage(this, false);
        }
        return this.toString() + '\nat unknown';
      }