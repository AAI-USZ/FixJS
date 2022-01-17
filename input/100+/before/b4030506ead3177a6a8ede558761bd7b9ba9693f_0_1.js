function(e) {
    var x1 = this.touch.x1,
        y1 = this.touch.y1,
        x2 = this.touch.x2,
        y2 = this.touch.y2;

    if ((this.touch.time && (Date.now() - this.touch.time >= this.HOLD_DELAY)) &&
        (Math.abs(x1 - x2) <= this.HOLD_TOLERANCE) &&
        (Math.abs(y1 - y2) <= this.HOLD_TOLERANCE)) {
      this.touch.type = 'taphold';
      this._triggerEvent(e);
    }
  }