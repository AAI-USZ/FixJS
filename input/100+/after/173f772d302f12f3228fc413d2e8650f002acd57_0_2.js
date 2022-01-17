function (e) {
      e.halt(true);
      this.dragging    = (e.target === this.mask.border);
      this.imageOrigin = this.el.getXY();

      var clicOrigin = [e.pageX - this.imageOrigin[0],
                        e.pageY - this.imageOrigin[1]];

      if (!this.dragging) {
         this.firstOrigin = null;
         this.setValue({origin: clicOrigin, size: [1,1]}, false);
      }
      else {
         this.firstOrigin = clicOrigin;
      }

      Y.one(document).on('mousemove', this._onMouseMove, this);

      Y.one(document).once('mouseup', function (e) {
         Y.one(document).detach('mousemove', this._onMouseMove);
         this._onMouseMove(e); // setValue one last time
         this.fireUpdatedEvt();
      }, this);
   }