function(options) {
      this.options = options != null ? options : {
        clickable: true,
        zIndex: this.getDefaultZIndex()
      };
      return this.setOverlay(new google.maps.Marker(this.options));
    }