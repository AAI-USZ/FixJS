function(r, g, b) {

      // Instead of calling p.color, we do the calculations ourselves to
      // reduce property lookups.
      var col = color$4(r, g, b, 0);
      var normalizedCol = [ ((col & PConstants.RED_MASK) >>> 16) / 255,
                            ((col & PConstants.GREEN_MASK) >>> 8) / 255,
                             (col & PConstants.BLUE_MASK) / 255 ];

      curContext.useProgram(programObject3D);
      uniformf("uSpecular3d", programObject3D, "uSpecular", normalizedCol);
    }