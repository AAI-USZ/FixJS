function(renderContext) {
        var i, j;
        if (this.vertices.length === 0) { return; }
        renderContext.beginShape();
        if (this.vertexCodes.length === 0) {  // each point is a simple vertex
          if (this.vertices[0].length === 2) {  // drawing 2D vertices
            for (i = 0, j = this.vertices.length; i < j; i++) {
              renderContext.vertex(this.vertices[i][0], this.vertices[i][1]);
            }
          } else {  // drawing 3D vertices
            for (i = 0, j = this.vertices.length; i < j; i++) {
              renderContext.vertex(this.vertices[i][0],
                                   this.vertices[i][1],
                                   this.vertices[i][2]);
            }
          }
        } else {  // coded set of vertices
          var index = 0;
          if (this.vertices[0].length === 2) {  // drawing a 2D path
            for (i = 0, j = this.vertexCodes.length; i < j; i++) {
              if (this.vertexCodes[i] === PConstants.VERTEX) {
                renderContext.vertex(this.vertices[index][0], this.vertices[index][1], this.vertices[index]["moveTo"]);
                renderContext.breakShape = false;
                index++;
              } else if (this.vertexCodes[i] === PConstants.BEZIER_VERTEX) {
                renderContext.bezierVertex(this.vertices[index+0][0],
                                           this.vertices[index+0][1],
                                           this.vertices[index+1][0],
                                           this.vertices[index+1][1],
                                           this.vertices[index+2][0],
                                           this.vertices[index+2][1]);
                index += 3;
              } else if (this.vertexCodes[i] === PConstants.CURVE_VERTEX) {
                renderContext.curveVertex(this.vertices[index][0],
                                          this.vertices[index][1]);
                index++;
              } else if (this.vertexCodes[i] ===  PConstants.BREAK) {
                renderContext.breakShape = true;
              }
            }
          } else {  // drawing a 3D path
            for (i = 0, j = this.vertexCodes.length; i < j; i++) {
              if (this.vertexCodes[i] === PConstants.VERTEX) {
                renderContext.vertex(this.vertices[index][0],
                                     this.vertices[index][1],
                                     this.vertices[index][2]);
                if (this.vertices[index]["moveTo"] === true) {
                  vertArray[vertArray.length-1]["moveTo"] = true;
                } else if (this.vertices[index]["moveTo"] === false) {
                  vertArray[vertArray.length-1]["moveTo"] = false;
                }
                renderContext.breakShape = false;
              } else if (this.vertexCodes[i] ===  PConstants.BEZIER_VERTEX) {
                renderContext.bezierVertex(this.vertices[index+0][0],
                                           this.vertices[index+0][1],
                                           this.vertices[index+0][2],
                                           this.vertices[index+1][0],
                                           this.vertices[index+1][1],
                                           this.vertices[index+1][2],
                                           this.vertices[index+2][0],
                                           this.vertices[index+2][1],
                                           this.vertices[index+2][2]);
                index += 3;
              } else if (this.vertexCodes[i] === PConstants.CURVE_VERTEX) {
                renderContext.curveVertex(this.vertices[index][0],
                                          this.vertices[index][1],
                                          this.vertices[index][2]);
                index++;
              } else if (this.vertexCodes[i] === PConstants.BREAK) {
                renderContext.breakShape = true;
              }
            }
          }
        }
        renderContext.endShape(this.close ? PConstants.CLOSE : PConstants.OPEN);
      }