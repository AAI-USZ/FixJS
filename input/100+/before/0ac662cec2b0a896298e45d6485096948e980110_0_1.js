function(mode) {
      if (vertArray.length === 0) { return; }
      var i,
          vertArrayLength = vertArray.length,
          start = vertArray[0],
          current,   // vertArray[i]
          next,      // vertArray[i+1]
          nextOver,  // vertArray[i+2]
          closeShape = (mode === PConstants.CLOSE);

      if (!renderSmooth) {
        curContext.translate(0.5,0.5);
      }

      pathStart = true;
      curContext.beginPath();

      // is specific shape building required?
      if (curShape !== undef && curShape !== PConstants.POLYGON) {
        endShapeSpecific(curShape, vertArray, vertArrayLength);
      } else {
        // normal shape building. This can consist of plain,
        // Catmull-Rom curve, and Bezier curve vertices.
        for(i = 0; i<vertArrayLength; i++) {
          current = vertArray[i];

          // Catmull-Rom curves must be converted to Bezier curves
          // before we can draw them. Doing so forwards the iterator
          // to the first non-Catmull-Rom vertex.
          if (current.type === PConstants.CURVE_VERTEX) {
            i += endShapeCurve(i,vertArray,vertArrayLength);
            continue;
          }

          if (current.type === PConstants.BEZIER_VERTEX) {
            curContext.bezierCurveTo(current.cx1, current.cy1, current.cx2, current.cy2, current.x2, current.y2);
          } else {
            if (current.moveTo) {
              if (closeShape && i>0) {
                // If we moveTo in the middle of a shape, check
                // whether we need to close the broken shape.
                curContext.lineTo(start.x, start.y);
                start = current;
              }
              curContext.moveTo(current.x, current.y);
            } else {
              curContext.lineTo(current.x, current.y);
            }
          }
        }
        setFillStroke(doFill, doStroke, current);
      }

      if (closeShape) {
        curContext.lineTo(start.x, start.y);
      }

      fillStrokeClose();

      if (!renderSmooth) {
        curContext.translate(-0.5,-0.5);
      }
    }