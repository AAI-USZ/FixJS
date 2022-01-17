function(opacity) {
      if (isNaN(opacity) || opacity>1 || opacity<0) {
        if (this.options.debug) {
          throw(opacity + ' is not a valid value');
        } else { return }
      }

      // Leaflet only accepts 0-0.99... Weird!
      this.layer.setOpacity(opacity == 1 ? 0.99 : opacity);
    }