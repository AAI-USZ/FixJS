function(renderContext) {
        if (this.family === PConstants.GROUP) {
          this.drawGroup(renderContext);
        } else if (this.family === PConstants.PRIMITIVE) {
          this.drawPrimitive(renderContext);
        } else if (this.family === PConstants.GEOMETRY) {
          this.drawGeometry(renderContext);
        } else if (this.family === PConstants.PATH) {
          this.drawPath(renderContext);
        }
      }