function(value) {
      this.isDisabledCheckingLimits = value;
      if (value) {
        var that = this;
        that.disabledCheckingLimitsTimeout = setTimeout(function() {
          that.isDisabledCheckingLimits = false;
          that.checkLimits();
        }, 1000);
      }
    }