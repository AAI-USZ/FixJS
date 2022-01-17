function(e, deltas) {
      var contentHeight, contentWidth, newHeight, newWidth, scale;
      contentWidth = this.$content.width();
      contentHeight = this.$content.height();
      newWidth = contentWidth + deltas.dx;
      newHeight = contentHeight + deltas.dy;
      scale = (newWidth * newHeight) / (contentWidth * contentHeight) * this._initialScale;
      if (newWidth * newHeight > 10) {
        this.model.set("scale", scale);
        return this._setUpdatedTransform();
      }
    }