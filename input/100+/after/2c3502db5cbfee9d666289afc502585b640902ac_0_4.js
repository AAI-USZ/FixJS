function(renderContext) {
        var i, j;
        renderContext.beginShape(this.kind);
        if (this.style) {
          for (i = 0, j = this.vertices.length; i < j; i++) {
            renderContext.vertex(this.vertices[i]);
          }
        } else {
          for (i = 0, j = this.vertices.length; i < j; i++) {
            var vert = this.vertices[i];
            if (vert[2] === 0) {
              renderContext.vertex(vert[0], vert[1]);
            } else {
              renderContext.vertex(vert[0], vert[1], vert[2]);
            }
          }
        }
        renderContext.endShape();
      }