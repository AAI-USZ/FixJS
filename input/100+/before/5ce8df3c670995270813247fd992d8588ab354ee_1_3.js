function() {

      this.currentWidth = this.width * this.scaleX;
      this.currentHeight = this.height * this.scaleY;

      this._hypotenuse = Math.sqrt(
        Math.pow(this.currentWidth / 2, 2) +
        Math.pow(this.currentHeight / 2, 2));

      this._angle = Math.atan(this.currentHeight / this.currentWidth);

      // offset added for rotate and scale actions
      var offsetX = Math.cos(this._angle + this.theta) * this._hypotenuse,
          offsetY = Math.sin(this._angle + this.theta) * this._hypotenuse,
          theta = this.theta,
          sinTh = Math.sin(theta),
          cosTh = Math.cos(theta);

      var tl = {
        x: this.left - offsetX,
        y: this.top - offsetY
      };
      var tr = {
        x: tl.x + (this.currentWidth * cosTh),
        y: tl.y + (this.currentWidth * sinTh)
      };
      var br = {
        x: tr.x - (this.currentHeight * sinTh),
        y: tr.y + (this.currentHeight * cosTh)
      };
      var bl = {
        x: tl.x - (this.currentHeight * sinTh),
        y: tl.y + (this.currentHeight * cosTh)
      };
      var ml = {
        x: tl.x - (this.currentHeight/2 * sinTh),
        y: tl.y + (this.currentHeight/2 * cosTh)
      };
      var mt = {
        x: tl.x + (this.currentWidth/2 * cosTh),
        y: tl.y + (this.currentWidth/2 * sinTh)
      };
      var mr = {
        x: tr.x - (this.currentHeight/2 * sinTh),
        y: tr.y + (this.currentHeight/2 * cosTh)
      };
      var mb = {
        x: bl.x + (this.currentWidth/2 * cosTh),
        y: bl.y + (this.currentWidth/2 * sinTh)
      };
      var mtr = {
        x: tl.x + (this.currentWidth/2 * cosTh),
        y: tl.y + (this.currentWidth/2 * sinTh)
      };
      var mbr = {
        x: tl.x + (this.currentWidth/2 * cosTh),
        y: tl.y + (this.currentWidth/2 * sinTh)
      };

      // debugging

      // setTimeout(function() {
      //         canvas.contextTop.fillStyle = 'green';
      //         canvas.contextTop.fillRect(mb.x, mb.y, 3, 3);
      //         canvas.contextTop.fillRect(bl.x, bl.y, 3, 3);
      //         canvas.contextTop.fillRect(br.x, br.y, 3, 3);
      //         canvas.contextTop.fillRect(tl.x, tl.y, 3, 3);
      //         canvas.contextTop.fillRect(tr.x, tr.y, 3, 3);
      //         canvas.contextTop.fillRect(ml.x, ml.y, 3, 3);
      //         canvas.contextTop.fillRect(mr.x, mr.y, 3, 3);
      //         canvas.contextTop.fillRect(mt.x, mt.y, 3, 3);
      //       }, 50);

      // clockwise
      this.oCoords = { tl: tl, tr: tr, br: br, bl: bl, ml: ml, mt: mt, mr: mr, mb: mb, mtr: mtr, mbr: mbr };

      // set coordinates of the draggable boxes in the corners used to scale/rotate the image
      this._setCornerCoords();

      return this;
    }