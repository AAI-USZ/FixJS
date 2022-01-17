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

      uniformf("uLights.color.3d." + lightCount, programObject3D, "uLights" + lightCount + ".color", normalizedCol);
      uniformf("uLights.position.3d." + lightCount, programObject3D, "uLights" + lightCount + ".position", pos.array());
      uniformf("uLights.direction.3d." + lightCount, programObject3D, "uLights" + lightCount + ".direction", dir);
      uniformf("uLights.concentration.3d." + lightCount, programObject3D, "uLights" + lightCount + ".concentration", concentration);
      uniformf("uLights.angle.3d." + lightCount, programObject3D, "uLights" + lightCount + ".angle", angle);
      uniformi("uLights.type.3d." + lightCount, programObject3D, "uLights" + lightCount + ".type", 3);
      uniformi("uLightCount3d", programObject3D, "uLightCount", ++lightCount);
    }