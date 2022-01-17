function() {
      var _ref;
      this.infoBox.close();
      if ((_ref = this.feature) != null ? _ref.isHighlighted : void 0) {
        this.feature.setHighlight(false);
      }
      this.feature = null;
      return this.isMouseover = false;
    }