function() {
      var _ref;
      this.isMouseover = false;
      this.infoBox.close();
      if ((_ref = this.feature) != null ? _ref.isHighlighted() : void 0) {
        this.feature.setHighlight(false);
      }
      return this.feature = null;
    }