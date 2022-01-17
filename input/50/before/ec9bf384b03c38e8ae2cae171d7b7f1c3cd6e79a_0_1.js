function(step){
      if (this.options.historyEnabled) {
        this._updateHistory(step);
      } else {
        this._show(step);
      }
    }