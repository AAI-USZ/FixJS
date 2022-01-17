function(pos) {
    var octx = this.octx,
      options = this.options.crosshair,
      plotOffset = this.plotOffset,
      x = plotOffset.left+pos.relX+0.5,
      y = plotOffset.top+pos.relY+0.5;
    
    if (pos.relX < 0 || pos.relY < 0 || pos.relX > this.plotWidth || pos.relY > this.plotHeight) {
      this.el.style.cursor = null;
      D.removeClass(this.el, 'flotr-crosshair');
      return; 
    }
    
    this.lastMousePos.relX = null;
    this.lastMousePos.relY = null;
    
    if (options.hideCursor) {
      this.el.style.cursor = 'none';
      D.addClass(this.el, 'flotr-crosshair');
    }
    
    octx.save();
    octx.strokeStyle = options.color;
    octx.lineWidth = 1;
    octx.beginPath();
    
    if (options.mode.indexOf('x') != -1) {
      octx.moveTo(x, plotOffset.top);
      octx.lineTo(x, plotOffset.top + this.plotHeight);
      this.lastMousePos.relX = x;
    }
    
    if (options.mode.indexOf('y') != -1) {
      octx.moveTo(plotOffset.left, y);
      octx.lineTo(plotOffset.left + this.plotWidth, y);
      this.lastMousePos.relY = y;
    }
    
    octx.stroke();
    octx.restore();
  }