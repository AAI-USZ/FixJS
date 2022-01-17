function() {
        if (this.kind === PConstants.POINT) {
          p.point(this.params[0], this.params[1]);
        } else if (this.kind === PConstants.LINE) {
          if (this.params.length === 4) {  // 2D
            p.line(this.params[0], this.params[1],
                   this.params[2], this.params[3]);
          } else {  // 3D
            p.line(this.params[0], this.params[1], this.params[2],
                   this.params[3], this.params[4], this.params[5]);
          }
        } else if (this.kind === PConstants.TRIANGLE) {
          p.triangle(this.params[0], this.params[1],
                     this.params[2], this.params[3],
                     this.params[4], this.params[5]);
        } else if (this.kind === PConstants.QUAD) {
          p.quad(this.params[0], this.params[1],
                 this.params[2], this.params[3],
                 this.params[4], this.params[5],
                 this.params[6], this.params[7]);
        } else if (this.kind === PConstants.RECT) {
          if (this.image !== null) {
            p.imageMode(PConstants.CORNER);
            p.image(this.image,
                    this.params[0],
                    this.params[1],
                    this.params[2],
                    this.params[3]);
          } else {
            p.rectMode(PConstants.CORNER);
            p.rect(this.params[0],
                   this.params[1],
                   this.params[2],
                   this.params[3]);
          }
        } else if (this.kind === PConstants.ELLIPSE) {
          p.ellipseMode(PConstants.CORNER);
          p.ellipse(this.params[0],
                    this.params[1],
                    this.params[2],
                    this.params[3]);
        } else if (this.kind === PConstants.ARC) {
          p.ellipseMode(PConstants.CORNER);
          p.arc(this.params[0],
                this.params[1],
                this.params[2],
                this.params[3],
                this.params[4],
                this.params[5]);
        } else if (this.kind === PConstants.BOX) {
          if (this.params.length === 1) {
            p.box(this.params[0]);
          } else {
            p.box(this.params[0], this.params[1], this.params[2]);
          }
        } else if (this.kind === PConstants.SPHERE) {
          p.sphere(this.params[0]);
        }
      }