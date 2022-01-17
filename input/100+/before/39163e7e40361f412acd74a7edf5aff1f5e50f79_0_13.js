function (options, shadowOffset, incStack) {

    var
      context   = options.context,
      width     = options.plotWidth, 
      height    = options.plotHeight,
      xScale    = options.xScale,
      yScale    = options.yScale,
      data      = options.data, 
      stack     = options.stacked ? this.stack : false,
      length    = data.length - 1,
      prevx     = null,
      prevy     = null,
      zero      = yScale(0),
      x1, x2, y1, y2, stack1, stack2, i;
      
    if (length < 1) return;

    context.beginPath();

    for (i = 0; i < length; ++i) {

      // To allow empty values
      if (data[i][1] === null || data[i+1][1] === null) continue;

      // Zero is infinity for log scales
      // TODO handle zero for logarithmic
      // if (xa.options.scaling === 'logarithmic' && (data[i][0] <= 0 || data[i+1][0] <= 0)) continue;
      // if (ya.options.scaling === 'logarithmic' && (data[i][1] <= 0 || data[i+1][1] <= 0)) continue;
      
      x1 = xScale(data[i][0]);
      x2 = xScale(data[i+1][0]);
      
      if (stack) {

        stack1 = stack.values[data[i][0]] || 0;
        stack2 = stack.values[data[i+1][0]] || stack.values[data[i][0]] || 0;

        y1 = yScale(data[i][1] + stack1);
        y2 = yScale(data[i+1][1] + stack2);
        
        if(incStack){
          stack.values[data[i][0]] = data[i][1]+stack1;
            
          if(i == length-1)
            stack.values[data[i+1][0]] = data[i+1][1]+stack2;
        }
      }
      else{
        y1 = yScale(data[i][1]);
        y2 = yScale(data[i+1][1]);
      }

      if ((y1 >= height && y2 >= width) || 
        (y1 <= 0 && y2 <= 0) ||
        (x1 <= 0 && x2 <= 0) ||
        (x1 >= width && x2 >= width)) continue;

      if((prevx != x1) || (prevy != y1 + shadowOffset))
        context.moveTo(x1, y1 + shadowOffset);
      
      prevx = x2;
      prevy = y2 + shadowOffset;
      if (options.steps) {
        context.lineTo(prevx + shadowOffset / 2, y1 + shadowOffset);
        context.lineTo(prevx + shadowOffset / 2, prevy);
      } else {
        context.lineTo(prevx, prevy);
      }
    }
    
    if (!options.fill || options.fill && !options.fillBorder) context.stroke();

    // TODO stacked lines
    if(!shadowOffset && options.fill){
      x1 = xScale(data[0][0]);
      context.fillStyle = options.fillStyle;
      context.lineTo(x2, zero);
      context.lineTo(x1, zero);
      context.lineTo(x1, yScale(data[0][1]));
      context.fill();
      if (options.fillBorder) {
        context.stroke();
      }
    }

    context.closePath();
  }