function endShapeSpecific(curShape, vertArray, vertArrayLength) {
      var i,j,
          start = vertArray[0],
          previous,  // vertArray[i-1]
          current,   // vertArray[i]
          next,      // vertArray[i+1]
          nextOver;  // vertArray[i+2]

      if (curShape === PConstants.POINTS) {
        var lastcolor = 0;
        for (i = 0; i < vertArrayLength; i++) {
          current = vertArray[i];
          //  For some reason this does not work:
          //
          //    setFillStroke(false,true,current);
          //    curContext.fillStyle = curContext.strokeStyle;
          //
          //  So, we use explicit color values when
          //  there is a color change required.
          var c = current.strokeColor;
          if (c !== lastcolor) {
            curContext.fillStyle = 'rgba('+p.red(c)+', '+p.green(c)+', '+p.blue(c)+', '+(p.alpha(c)/colorModeA)+')';
          }
          if (lineWidth > 1) {
            curContext.arc(current.x, current.y, lineWidth / 2, 0, PConstants.TWO_PI, false);
            curContext.fill();
            curContext.beginPath();
          } else {
            curContext.fillRect(current.x, current.y, 1, 1);
          }
        }
      }

      else if (curShape === PConstants.LINES) {
        for (i = 0; (i + 1) < vertArrayLength; i+=2) {
          current = vertArray[i];
          next = vertArray[i+1];
          setFillStroke(false, doStroke, next);
          curContext.moveTo(current.x, current.y);
          curContext.lineTo(next.x, next.y);
          setFillStroke(doFill, doStroke, next);
          fillStrokeClose();
        }
      }

      else if (curShape === PConstants.TRIANGLES) {
        if (vertArrayLength > 2) {
          for (i = 0; (i + 2) < vertArrayLength; i+=3) {
            current  = vertArray[i];
            next     = vertArray[i+1];
            nextOver = vertArray[i+2];

            curContext.beginPath();
            curContext.moveTo(current.x, current.y);
            curContext.lineTo(next.x, next.y);
            curContext.lineTo(nextOver.x, nextOver.y);
            curContext.lineTo(current.x, current.y);

            setFillStroke(doFill, doStroke, nextOver);
            fillStrokeClose();
          }
        }
      }

      else if (curShape === PConstants.TRIANGLE_STRIP) {
        if (vertArrayLength > 2) {
          // ensure that the first iteration ends up as
          // {current=0/next=1/nextover=2}
          next     = vertArray[0];
          nextOver = vertArray[1];
          for (i = 2; i < vertArrayLength; i++) {
            fillStrokeClose();

            current = next;
            next = nextOver;
            nextOver = vertArray[i];

            curContext.beginPath();
            curContext.moveTo(current.x, current.y);
            curContext.lineTo(next.x, next.y);
            curContext.lineTo(nextOver.x, nextOver.y);
            curContext.lineTo(current.x, current.y);
            setFillStroke(doFill, doStroke, nextOver);
          }
        }
      }

      /**
       * TRIANGLE_FAN shapes are a bit odd. The first
       * three vertices form a closed triangle. Subsequent
       * individual vertices create a new filled triangle
       * but do NOT close off. Not even with endShape(CLOSE).
       * This is the same for P5 v1.5.1 and v2.0 so presumably
       * this is intentional behaviour.
       *
       * See http://code.google.com/p/processing/issues/detail?id=1137
       */
      else if (curShape === PConstants.TRIANGLE_FAN) {
        if (vertArrayLength > 2) {
          // initial closed triangle
          start = vertArray[0];
          previous = vertArray[1];
          current  = vertArray[2];

          curContext.beginPath();
          curContext.moveTo(start.x, start.y);
          curContext.lineTo(previous.x, previous.y);
          curContext.lineTo(current.x, current.y);
          setFillStroke(doFill, doStroke, current);
          fillStrokeClose();

          // subsequent triangles
          if (vertArrayLength > 3) {
            var last = vertArray[vertArrayLength-1],
                 closing = (start.x === last.x && start.y === last.y),
                 end = closing ? vertArrayLength -1 : vertArrayLength,
                 strokeLimit = end - 1;

            // treat all fills first, because these can overwrite the stroking.
            curContext.strokeStyle = "none";
            for (i = 2; i < vertArrayLength; i++) {
              previous = vertArray[i-1];
              current  = vertArray[i];
              curContext.beginPath();
              curContext.moveTo(start.x, start.y);
              curContext.lineTo(previous.x, previous.y);
              curContext.lineTo(current.x, current.y);
              setFillStroke(doFill, false, current);
              fillStrokeClose();
            }

            // then draw the strokes on top
            curContext.fillStyle = "none";
            for (i = 2; i < vertArrayLength; i++) {
              previous = vertArray[i-1];
              current  = vertArray[i];
              curContext.beginPath();
              curContext.moveTo(start.x, start.y);
              curContext.lineTo(previous.x, previous.y);
              curContext.lineTo(current.x, current.y);
              setFillStroke(false, doStroke, current);
              if (i === strokeLimit && closing) {
                curContext.closePath();
              }
              executeContextStroke();
            }
          }
        }
      }

      else if (curShape === PConstants.QUADS) {
        if (vertArrayLength > 3) {
          for (i = 0; (i + 3) < vertArrayLength; i+=4) {
            start = vertArray[i];

            curContext.beginPath();
            curContext.moveTo(start.x, start.y);
            for (j = 1; j < 4; j++) {
              current = vertArray[i+j];
              curContext.lineTo(current.x, current.y);
            }
            curContext.lineTo(start.x, start.y);

            setFillStroke(doFill, doStroke, current);
            fillStrokeClose();
          }
        }
      }

      else if (curShape === PConstants.QUAD_STRIP) {
        if (vertArrayLength > 3) {
          // ensure that the first iteration ends up as
          // {start=0/current=1/next=3/nextover=2}
          next     = vertArray[1];
          nextOver = vertArray[0];
          for (i = 2; (i+1) < vertArrayLength; i+=2) {
            start    = nextOver;
            current  = next;
            next     = vertArray[i+1];
            nextOver = vertArray[i];

            curContext.beginPath();
            curContext.moveTo(start.x, start.y);
            curContext.lineTo(current.x, current.y);
            curContext.lineTo(next.x, next.y);
            curContext.lineTo(nextOver.x, nextOver.y);
            curContext.lineTo(start.x, start.y);

            setFillStroke(doFill, doStroke, next);
            fillStrokeClose();
          }
        }
      }
    }