function(value) {
      this.isTranslatingPages = value;
      if (value) {
        var that = this;
        that.translatingTimeout = setTimeout(function() {
          that.isTranslatingPages = false;
          that.checkLimits();
        }, 1000);
      }
    }