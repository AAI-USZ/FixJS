function(){
    var
      that = this,
      options = that.options,
      grid = options.grid,
      outline = grid.outline,
      ctx = that.ctx,
      backgroundImage = grid.backgroundImage,
      plotOffset = that.plotOffset,
      leftOffset = plotOffset.left,
      topOffset = plotOffset.top,
      plotWidth = that.plotWidth,
      plotHeight = that.plotHeight,
      v, img, src, left, top, globalAlpha;
    
    if (!grid.outlineWidth) return;
    
    ctx.save();
    
    if (grid.circular) {
      ctx.translate(leftOffset + plotWidth / 2, topOffset + plotHeight / 2);
      var radius = Math.min(plotHeight, plotWidth) * options.radar.radiusRatio / 2,
          sides = this.axes.x.ticks.length,
          coeff = 2*(Math.PI/sides),
          angle = -Math.PI/2;
      
      // Draw axis/grid border.
      ctx.beginPath();
      ctx.lineWidth = grid.outlineWidth;
      ctx.strokeStyle = grid.color;
      ctx.lineJoin = 'round';
      
      for(i = 0; i <= sides; ++i){
        ctx[i === 0 ? 'moveTo' : 'lineTo'](Math.cos(i*coeff+angle)*radius, Math.sin(i*coeff+angle)*radius);
      }
      //ctx.arc(0, 0, radius, 0, Math.PI*2, true);

      ctx.stroke();
    }
    else {
      ctx.translate(leftOffset, topOffset);
      
      // Draw axis/grid border.
      var lw = grid.outlineWidth,
          orig = 0.5-lw+((lw+1)%2/2),
          lineTo = 'lineTo',
          moveTo = 'moveTo';
      ctx.lineWidth = lw;
      ctx.strokeStyle = grid.color;
      ctx.lineJoin = 'miter';
      ctx.beginPath();
      ctx.moveTo(orig, orig);
      plotWidth = plotWidth - (lw / 2) % 1;
      plotHeight = plotHeight + lw / 2;
      ctx[outline.indexOf('n') !== -1 ? lineTo : moveTo](plotWidth, orig);
      ctx[outline.indexOf('e') !== -1 ? lineTo : moveTo](plotWidth, plotHeight);
      ctx[outline.indexOf('s') !== -1 ? lineTo : moveTo](orig, plotHeight);
      ctx[outline.indexOf('w') !== -1 ? lineTo : moveTo](orig, orig);
      ctx.stroke();
      ctx.closePath();
    }
    
    ctx.restore();

    if (backgroundImage) {

      src = backgroundImage.src || backgroundImage;
      left = (parseInt(backgroundImage.left, 10) || 0) + plotOffset.left;
      top = (parseInt(backgroundImage.top, 10) || 0) + plotOffset.top;
      img = new Image();

      img.onload = function() {
        ctx.save();
        if (backgroundImage.alpha) ctx.globalAlpha = backgroundImage.alpha;
        ctx.globalCompositeOperation = 'destination-over';
        ctx.drawImage(img, 0, 0, plotWidth, plotHeight, left, top, plotWidth, plotHeight);
        ctx.restore();
      };

      img.src = src;
    }
  }