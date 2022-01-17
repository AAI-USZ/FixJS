function(){
        if (this.family === PConstants.GROUP) {
          this.drawGroup();
        } else if (this.family === PConstants.PRIMITIVE) {
          this.drawPrimitive();
        } else if (this.family === PConstants.GEOMETRY) {
          this.drawGeometry();
        } else if (this.family === PConstants.PATH) {
          this.drawPath();
        }
      }