function(event) {
      var moveEvent, opts, touches;
      opts = this.options;
      if ($.browser.msie && !event.button || this.isStartDrag === false) {
        return this._stopdrag(event);
      }
      if (this.isStartDrag === true) {
        if (this.isTouch === true) {
          touches = event.originalEvent.touches || event.originalEvent.targetTouches || event.originalEvent.changedTouches;
        }
        moveEvent = typeof touches === "undefined" ? event : touches[0];
        this.duringDND = {
          pageX: moveEvent.pageX,
          pageY: moveEvent.pageY,
          timestamp: event.timeStamp
        };
        this.posDND.X = parseInt(moveEvent.pageX - this.initDND.origX);
        this.posDND.Y = parseInt(moveEvent.pageY - this.initDND.origY);
        switch (opts.direction) {
          case "matrix":
            this.handler.css({
              left: this.posDND.origX + this.posDND.X,
              top: this.posDND.origY + this.posDND.Y
            });
            break;
          case "vertical":
            this.handler.css("top", this.posDND.origY + this.posDND.Y);
            break;
          case "horizontal":
            this.handler.css("left", this.posDND.origX + this.posDND.X);
        }
      }
      if (this.isTouch === true) {
        if (this.boundry.top > moveEvent.pageY || this.boundry.left > moveEvent.pageX || this.boundry.right < moveEvent.pageX || this.boundry.bottom < moveEvent.pageY) {
          this._stopdrag(event);
        }
      }
      moveEvent = null;
      return this.isStartDrag;
    }