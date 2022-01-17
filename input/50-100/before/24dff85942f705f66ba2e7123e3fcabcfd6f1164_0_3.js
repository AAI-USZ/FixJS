function tabSwipe_pan(e) {
      if (!this.deleteable) {
        return;
      }
      var movement = Math.min(this.containerWidth,
                              Math.abs(e.detail.absolute.dx));
      if (movement > 0) {
        this.tab.style.opacity = 1 - (movement / this.containerWidth);
      }
      this.tab.style.left = e.detail.absolute.dx + 'px';
    }