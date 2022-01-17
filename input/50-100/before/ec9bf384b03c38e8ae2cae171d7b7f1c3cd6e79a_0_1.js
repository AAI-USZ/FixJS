function() {
      if (this.activatedSteps.length > 0) {
        if (this.options.historyEnabled) {
          History.back();
        } else {
          this._show(this.activatedSteps[this.activatedSteps.length - 2], true);
        }
      }
      return false;
    }