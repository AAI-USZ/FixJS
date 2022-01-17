function(renderContext) {
        if (this.stroke) {
          renderContext.stroke(this.strokeColor);
          renderContext.strokeWeight(this.strokeWeight);
          renderContext.strokeCap(this.strokeCap);
          renderContext.strokeJoin(this.strokeJoin);
        } else {
          renderContext.noStroke();
        }

        if (this.fill) {
          renderContext.fill(this.fillColor);

        } else {
          renderContext.noFill();
        }
      }