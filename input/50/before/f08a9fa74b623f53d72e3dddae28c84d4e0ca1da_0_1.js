function fillStrokeClose(bypassClose) {
      executeContextFill();
      executeContextStroke();
      if (bypassClose !== false) {
        curContext.closePath();
      }
    }