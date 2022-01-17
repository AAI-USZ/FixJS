function (n) {

    var
      pos         = '', 
      s           = n.series,
      p           = n.mouse.position, 
      m           = n.mouse.margin,
      x           = n.x,
      y           = n.y,
      elStyle     = S_MOUSETRACK,
      mouseTrack  = this.mouseTrack,
      plotOffset  = this.plotOffset,
      left        = plotOffset.left,
      right       = plotOffset.right,
      bottom      = plotOffset.bottom,
      top         = plotOffset.top,
      decimals    = n.mouse.trackDecimals,
      options     = this.options;

    // Create
    if (!mouseTrack) {
      mouseTrack = D.node('<div class="flotr-mouse-value"></div>');
      this.mouseTrack = mouseTrack;
      D.insert(this.el, mouseTrack);
    }

    if (!n.mouse.relative) { // absolute to the canvas

      if      (p.charAt(0) == 'n') pos += 'top:' + (m + top) + 'px;bottom:auto;';
      else if (p.charAt(0) == 's') pos += 'bottom:' + (m + bottom) + 'px;top:auto;';
      if      (p.charAt(1) == 'e') pos += 'right:' + (m + right) + 'px;left:auto;';
      else if (p.charAt(1) == 'w') pos += 'left:' + (m + left) + 'px;right:auto;';

    // Pie
    } else if (s.pie && s.pie.show) {
      var center = {
          x: (this.plotWidth)/2,
          y: (this.plotHeight)/2
        },
        radius = (Math.min(this.canvasWidth, this.canvasHeight) * s.pie.sizeRatio) / 2,
        bisection = n.sAngle<n.eAngle ? (n.sAngle + n.eAngle) / 2: (n.sAngle + n.eAngle + 2* Math.PI) / 2;
      
      pos += 'bottom:' + (m - top - center.y - Math.sin(bisection) * radius/2 + this.canvasHeight) + 'px;top:auto;';
      pos += 'left:' + (m + left + center.x + Math.cos(bisection) * radius/2) + 'px;right:auto;';

    // Default
    } else {    
      if (/n/.test(p)) pos += 'bottom:' + (m - top - n.yaxis.d2p(n.y) + this.canvasHeight) + 'px;top:auto;';
      else             pos += 'top:' + (m + top + n.yaxis.d2p(n.y)) + 'px;bottom:auto;';
      if (/w/.test(p)) pos += 'right:' + (m - left - n.xaxis.d2p(n.x) + this.canvasWidth) + 'px;left:auto;';
      else             pos += 'left:' + (m + left + n.xaxis.d2p(n.x)) + 'px;right:auto;';
    }

    elStyle += pos;
    mouseTrack.style.cssText = elStyle;
    if (!decimals || decimals < 0) decimals = 0;
    
    if (x && x.toFixed) x = x.toFixed(decimals);

    if (y && y.toFixed) y = y.toFixed(decimals);

    mouseTrack.innerHTML = n.mouse.trackFormatter({
      x: x ,
      y: y, 
      series: n.series, 
      index: n.index,
      nearest: n,
      fraction: n.fraction
    });

    D.show(mouseTrack);

    if (n.mouse.relative) {
      if (!/[ew]/.test(p)) {
        // Center Horizontally
        mouseTrack.style.left =
          (left + n.xaxis.d2p(n.x) - D.size(mouseTrack).width / 2) + 'px';
      } else
      if (!/[ns]/.test(p)) {
        // Center Vertically
        mouseTrack.style.top =
          (top + n.yaxis.d2p(n.y) - D.size(mouseTrack).height / 2) + 'px';
      }
    }
  }