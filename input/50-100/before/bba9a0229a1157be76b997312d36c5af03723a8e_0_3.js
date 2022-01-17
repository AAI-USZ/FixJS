function() {
      this.infoBox.close();
      if (this.feature.isHighlighted) this.feature.setHighlight(false);
      this.feature = null;
      return this.isMouseover = false;
    }