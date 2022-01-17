function(e) {
    this.touchTimeout = null;
    if ( this.target && e.target === this.target[0] &&
          this.TAP_TOLERANCE >= Math.abs(this.touch.x1 - this.touch.x2) &&
          this.TAP_TOLERANCE >= Math.abs(this.touch.y1 - this.touch.y2) ) {
      this.touch.type = 'tap';
      this._triggerEvent(e);
    }
    this._resetTouch();
  }