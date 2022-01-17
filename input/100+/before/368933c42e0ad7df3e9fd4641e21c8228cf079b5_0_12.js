function(r, g, b, x, y, z, nx, ny, nz, angle, concentration) {
      if (lightCount === PConstants.MAX_LIGHTS) {
        throw "can only create " + PConstants.MAX_LIGHTS + " lights";
      }

      curContext.useProgram(programObject3D);

      // multiply the position and direction by the model view matrix
      // once per object rather than once per vertex.
      var pos = new PVector(x, y, z);
      var mvm = new PMatrix3D();
      mvm.scale(1, -1, 1);
      mvm.apply(modelView.array());
      mvm.mult(pos, pos);

      // Convert to array since we need to directly access the elements.
      mvm = mvm.array();

      // We need to multiply the direction by the model view matrix, but
      // the mult function checks the w component of the vector, if it isn't
      // present, it uses 1, so we use a very small value as a work around.
      var dir = [
          mvm[0] * nx + mvm[4] * ny + mvm[8] * nz,
          mvm[1] * nx + mvm[5] * ny + mvm[9] * nz,
          mvm[2] * nx + mvm[6] * ny + mvm[10] * nz
      ];

      // Instead of calling p.color, we do the calculations ourselves to
      // reduce property lookups.
      var col = color$4(r, g, b, 0);
      var normalizedCol = [ ((col & PConstants.RED_MASK) >>> 16) / 255,
                            ((col & PConstants.GREEN_MASK) >>> 8) / 255,
                             (col & PConstants.BLUE_MASK) / 255 ];

      uniformf("lights.color.3d." + lightCount, programObject3D, "lights" + lightCount + ".color", normalizedCol);
      uniformf("lights.position.3d." + lightCount, programObject3D, "lights" + lightCount + ".position", pos.array());
      uniformf("lights.direction.3d." + lightCount, programObject3D, "lights" + lightCount + ".direction", dir);
      uniformf("lights.concentration.3d." + lightCount, programObject3D, "lights" + lightCount + ".concentration", concentration);
      uniformf("lights.angle.3d." + lightCount, programObject3D, "lights" + lightCount + ".angle", angle);
      uniformi("lights.type.3d." + lightCount, programObject3D, "lights" + lightCount + ".type", 3);
      uniformi("lightCount3d", programObject3D, "lightCount", ++lightCount);
    }