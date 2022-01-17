function(w) {
      DrawingShared.prototype.strokeWeight.apply(this, arguments);

      // Processing groups the weight of points and lines under this one function,
      // but for WebGL, we need to set a uniform for points and call a function for line.

      curContext.useProgram(programObject2D);
      uniformf("pointSize2d", programObject2D, "uPointSize", w);

      curContext.useProgram(programObjectUnlitShape);
      uniformf("pointSizeUnlitShape", programObjectUnlitShape, "uPointSize", w);

      curContext.lineWidth(w);
    }