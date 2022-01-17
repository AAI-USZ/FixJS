function fill () {
      // TODO stacked lines
      if(!shadowOffset && options.fill && start){
        context.fillStyle = options.fillStyle;
        // Add the last point, so that the series at the bottom extends
        context.lineTo(x2, zero);
        // Add the points that are stacked up
        for (j = i; j >= 0; --j) {
          xj = data[j][0];
          yj = oldStack.values[data[j][0]];
          context.lineTo(xScale(xj), yScale(yj));
        }
        // Add the first point, so that the series at the bottom extends
        context.lineTo(xScale(start[0]), zero);
        context.fill();
        if (options.fillBorder) {
          context.stroke();
        }
      }
    }