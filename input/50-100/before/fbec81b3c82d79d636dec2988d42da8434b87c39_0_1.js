function(opacity) {
      if (isNaN(opacity) || opacity>1 || opacity<0) {
        if (this.options.debug) {
          throw(opacity + ' is not a valid value');
        } else { return }
      }

      this.layer.setOpacity(opacity);
    }