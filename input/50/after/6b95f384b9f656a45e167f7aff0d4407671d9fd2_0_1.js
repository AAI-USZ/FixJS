function (val) {
      if (!(val in STATES)) {
        throw new Error('Invalid connection state: ' + val);
      }

      this._readyState = val;
      this.emit(STATES[val]);
    }