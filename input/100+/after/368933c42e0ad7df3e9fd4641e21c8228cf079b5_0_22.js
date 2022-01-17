function(x, y, width, height, start, stop) {
      if (width <= 0 || stop < start) { return; }

      if (curEllipseMode === PConstants.CORNERS) {
        width = width - x;
        height = height - y;
      } else if (curEllipseMode === PConstants.RADIUS) {
        x = x - width;
        y = y - height;
        width = width * 2;
        height = height * 2;
      } else if (curEllipseMode === PConstants.CENTER) {
        x = x - width/2;
        y = y - height/2;
      }
      // make sure that we're starting at a useful point
      while (start < 0) {
        start += PConstants.TWO_PI;
        stop += PConstants.TWO_PI;
      }
      if (stop - start > PConstants.TWO_PI) {
        start = 0;
        stop = PConstants.TWO_PI;
      }
      var hr = width / 2,
          vr = height / 2,
          centerX = x + hr,
          centerY = y + vr,
          startLUT = 0 | (0.5 + start * p.RAD_TO_DEG * 2),
          stopLUT  = 0 | (0.5 + stop * p.RAD_TO_DEG * 2),
          i, j;
      if (doFill) {
        // shut off stroke for a minute
        var savedStroke = doStroke;
        doStroke = false;
        p.beginShape();
        p.vertex(centerX, centerY);
        for (i = startLUT; i <= stopLUT; i++) {
          j = i % PConstants.SINCOS_LENGTH;
          p.vertex(centerX + cosLUT[j] * hr, centerY + sinLUT[j] * vr);
        }
        p.endShape(PConstants.CLOSE);
        doStroke = savedStroke;
      }

      if (doStroke) {
        // and doesn't include the first (center) vertex.
        var savedFill = doFill;
        doFill = false;
        p.beginShape();
        for (i = startLUT; i <= stopLUT; i++) {
          j = i % PConstants.SINCOS_LENGTH;
          p.vertex(centerX + cosLUT[j] * hr, centerY + sinLUT[j] * vr);
        }
        p.endShape();
        doFill = savedFill;
      }
    }