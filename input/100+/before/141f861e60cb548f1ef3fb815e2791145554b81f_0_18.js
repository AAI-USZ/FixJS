function(r, g, b, x, y, z) {
      if (lightCount === PConstants.MAX_LIGHTS) {
        throw "can only create " + PConstants.MAX_LIGHTS + " lights";
      }

      var pos = new PVector(x, y, z);
      var view = new PMatrix3D();
      view.scale(1, -1, 1);
      view.apply(modelView.array());
      view.mult(pos, pos);

      // Instead of calling p.color, we do the calculations ourselves to 
      // reduce property lookups.
      var col = color$4(r, g, b, 0);
      var normalizedCol = [ ((col & PConstants.RED_MASK) >>> 16) / 255,
                            ((col & PConstants.GREEN_MASK) >>> 8) / 255,
                             (col & PConstants.BLUE_MASK) / 255 ];

      curContext.useProgram(programObject3D);
      uniformf("lights.color.3d." + lightCount, programObject3D, "lights" + lightCount + ".color", normalizedCol);
      uniformf("lights.position.3d." + lightCount, programObject3D, "lights" + lightCount + ".position", pos.array());
      uniformi("lights.type.3d." + lightCount, programObject3D, "lights" + lightCount + ".type", 0);
      uniformi("lightCount3d", programObject3D, "lightCount", ++lightCount);
    }