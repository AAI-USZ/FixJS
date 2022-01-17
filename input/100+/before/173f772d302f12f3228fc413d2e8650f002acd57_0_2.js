function (e) {
      e.halt(true);
      this.dragging    = (e.target === this.mask.border);
      this.imageOrigin = this.el.getXY();
      this.firstOrigin = [Math.max(0, e.pageX - this.imageOrigin[0]),
                          Math.max(0, e.pageY - this.imageOrigin[1])];

      if (!this.dragging) {
         this.setValue({origin: this.firstOrigin, size: [1,1]}, false);
      }

      Y.one(document).on('mousemove', this._onMouseMove, this);

      Y.one(document).once('mouseup', function (e) {
         Y.one(document).detach('mousemove', this._onMouseMove);
         this._onMouseMove(e); // setValue one last time
         this.fireUpdatedEvt();
      }, this);
   }