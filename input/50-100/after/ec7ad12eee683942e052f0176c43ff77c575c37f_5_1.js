function dg_setDisabledCheckingLimits(value) {
      this.isDisabledCheckingLimits = value;
      if (value) {
        var self = this;
        this.disabledCheckingLimitsTimeout = setTimeout(
          function dg_disabledCheckingLimitsTimeout() {
            self.isDisabledCheckingLimits = false;
            self.checkLimits();
          }
        , 1000);
      }
    }