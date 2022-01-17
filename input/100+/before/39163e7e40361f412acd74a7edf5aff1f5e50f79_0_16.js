function (options) {

    // TODO 3D charts what?

    var
      data          = options.data,
      context       = options.context,
      canvas        = context.canvas,
      lineWidth     = options.lineWidth,
      shadowSize    = options.shadowSize,
      sizeRatio     = options.sizeRatio,
      height        = options.height,
      explode       = options.explode,
      color         = options.color,
      fill          = options.fill,
      fillStyle     = options.fillStyle,
      radius        = Math.min(canvas.width, canvas.height) * sizeRatio / 2,
      value         = data[0][1],
      html          = [],
      vScale        = 1,//Math.cos(series.pie.viewAngle);
      measure       = Math.PI * 2 * value / this.total,
      startAngle    = this.startAngle || (2 * Math.PI * options.startAngle), // TODO: this initial startAngle is already in radians (fixing will be test-unstable)
      endAngle      = startAngle + measure,
      bisection     = startAngle + measure / 2,
      label         = options.labelFormatter(this.total, value),
      //plotTickness  = Math.sin(series.pie.viewAngle)*series.pie.spliceThickness / vScale;
      alignRight    = (Math.cos(bisection) < 0),
      alignTop      = (Math.sin(bisection) > 0),
      explodeCoeff  = explode + radius + 4,
      style,
      x, y,
      distX, distY;
    
    context.save();
    context.translate(options.width / 2, options.height / 2);
    context.scale(1, vScale);

    x = Math.cos(bisection) * explode;
    y = Math.sin(bisection) * explode;

    // Shadows
    if (shadowSize > 0) {
      this.plotSlice(x + shadowSize, y + shadowSize, radius, startAngle, endAngle, context);
      if (fill) {
        context.fillStyle = 'rgba(0,0,0,0.1)';
        context.fill();
      }
    }

    this.plotSlice(x, y, radius, startAngle, endAngle, context);
    if (fill) {
      context.fillStyle = fillStyle;
      context.fill();
    }
    context.lineWidth = lineWidth;
    context.strokeStyle = color;
    context.stroke();

    distX = Math.cos(bisection) * explodeCoeff;
    distY = Math.sin(bisection) * explodeCoeff;
    style = {
      size : options.fontSize * 1.2,
      color : options.fontColor,
      weight : 1.5
    };

    if (label) {
      if (options.htmlText || !options.textEnabled) {
        // TODO HTML text is broken here.
        var yAlignDist = textAlignTop ? (distY - 5) : (height - distY + 5),
            divStyle = 'position:absolute;' + (textAlignTop ? 'top' : 'bottom') + ':' + yAlignDist + 'px;'; //@todo: change
        if (textAlignRight)
          divStyle += 'right:'+(this.canvasWidth - distX)+'px;text-align:right;';
        else 
          divStyle += 'left:'+distX+'px;text-align:left;';
        html.push('<div style="', divStyle, '" class="flotr-grid-label">', label, '</div>');
      }
      else {
        style.textAlign = alignRight ? 'right' : 'left';
        style.textBaseline = alignTop ? 'top' : 'bottom';
        Flotr.drawText(context, label, distX, distY, style);
      }
    }
    
    if (options.htmlText || !options.textEnabled) {
      var div = Flotr.DOM.node('<div style="color:' + options.fontColor + '" class="flotr-labels"></div>');
      Flotr.DOM.insert(div, html.join(''));
      Flotr.DOM.insert(this.el, div);
    }
    
    context.restore();

    // New start angle
    this.startAngle = endAngle;
    this.slices = this.slices || [];
    this.slices.push({
      radius : Math.min(canvas.width, canvas.height) * sizeRatio / 2,
      x : x,
      y : y,
      explode : explode,
      start : startAngle,
      end : endAngle
    });
  }