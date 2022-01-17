function(mode) {
      // Duplicated in Drawing3D; too many variables used
      if (vertArray.length === 0) { return; }

      var closeShape = mode === PConstants.CLOSE;
      var lineVertArray = [];
      var fillVertArray = [];
      var colorVertArray = [];
      var strokeVertArray = [];
      var texVertArray = [];
      var cachedVertArray;

      firstVert = true;
      var i, j, k;
      var vertArrayLength = vertArray.length;

      for (i = 0; i < vertArrayLength; i++) {
        cachedVertArray = vertArray[i];
        for (j = 0; j < 3; j++) {
          fillVertArray.push(cachedVertArray[j]);
        }
      }

      // 5,6,7,8
      // R,G,B,A - fill colour
      for (i = 0; i < vertArrayLength; i++) {
        cachedVertArray = vertArray[i];
        for (j = 5; j < 9; j++) {
          colorVertArray.push(cachedVertArray[j]);
        }
      }

      // 9,10,11,12
      // R, G, B, A - stroke colour
      for (i = 0; i < vertArrayLength; i++) {
        cachedVertArray = vertArray[i];
        for (j = 9; j < 13; j++) {
          strokeVertArray.push(cachedVertArray[j]);
        }
      }

      // texture u,v
      for (i = 0; i < vertArrayLength; i++) {
        cachedVertArray = vertArray[i];
        texVertArray.push(cachedVertArray[3]);
        texVertArray.push(cachedVertArray[4]);
      }

      // if shape is closed, push the first point into the last point (including colours)
      if (closeShape) {
        fillVertArray.push(vertArray[0][0]);
        fillVertArray.push(vertArray[0][1]);
        fillVertArray.push(vertArray[0][2]);

        for (i = 5; i < 9; i++) {
          colorVertArray.push(vertArray[0][i]);
        }

        for (i = 9; i < 13; i++) {
          strokeVertArray.push(vertArray[0][i]);
        }

        texVertArray.push(vertArray[0][3]);
        texVertArray.push(vertArray[0][4]);
      }
      // End duplication

      // curveVertex
      if ( isCurve && (curShape === PConstants.POLYGON || curShape === undef) ) {
        lineVertArray = fillVertArray;
        if (doStroke) {
          line3D(lineVertArray, null, strokeVertArray);
        }
        if (doFill) {
          fill3D(fillVertArray, null, colorVertArray);
        }
      }
      // bezierVertex
      else if ( isBezier && (curShape === PConstants.POLYGON || curShape === undef) ) {
        lineVertArray = fillVertArray;
        lineVertArray.splice(lineVertArray.length - 3);
        strokeVertArray.splice(strokeVertArray.length - 4);
        if (doStroke) {
          line3D(lineVertArray, null, strokeVertArray);
        }
        if (doFill) {
          fill3D(fillVertArray, "TRIANGLES", colorVertArray);
        }
      }

      // render the vertices provided
      else {
        if (curShape === PConstants.POINTS) {       // if POINTS was the specified parameter in beginShape
          for (i = 0; i < vertArrayLength; i++) {  // loop through and push the point location information to the array
            cachedVertArray = vertArray[i];
            for (j = 0; j < 3; j++) {
              lineVertArray.push(cachedVertArray[j]);
            }
          }
          point3D(lineVertArray, strokeVertArray);  // render function for points
        } else if (curShape === PConstants.LINES) { // if LINES was the specified parameter in beginShape
          for (i = 0; i < vertArrayLength; i++) {  // loop through and push the point location information to the array
            cachedVertArray = vertArray[i];
            for (j = 0; j < 3; j++) {
              lineVertArray.push(cachedVertArray[j]);
            }
          }
          for (i = 0; i < vertArrayLength; i++) {  // loop through and push the color information to the array
            cachedVertArray = vertArray[i];
            for (j = 5; j < 9; j++) {
              colorVertArray.push(cachedVertArray[j]);
            }
          }
          line3D(lineVertArray, "LINES", strokeVertArray);  // render function for lines
        } else if (curShape === PConstants.TRIANGLES) {     // if TRIANGLES was the specified parameter in beginShape
          if (vertArrayLength > 2) {
            for (i = 0; (i+2) < vertArrayLength; i+=3) {   // loop through the array per triangle
              fillVertArray = [];
              texVertArray = [];
              lineVertArray = [];
              colorVertArray = [];
              strokeVertArray = [];
              for (j = 0; j < 3; j++) {
                for (k = 0; k < 3; k++) {                   // loop through and push
                  lineVertArray.push(vertArray[i+j][k]);    // the line point location information
                  fillVertArray.push(vertArray[i+j][k]);    // and fill point location information
                }
              }
              for (j = 0; j < 3; j++) {                     // loop through and push the texture information
                for (k = 3; k < 5; k++) {
                  texVertArray.push(vertArray[i+j][k]);
                }
              }
              for (j = 0; j < 3; j++) {
                for (k = 5; k < 9; k++) {                   // loop through and push
                  colorVertArray.push(vertArray[i+j][k]);   // the colour information
                  strokeVertArray.push(vertArray[i+j][k+4]);// and the stroke information
                }
              }
              if (doStroke) {
                line3D(lineVertArray, "LINE_LOOP", strokeVertArray );               // line render function
              }
              if (doFill || usingTexture) {
                fill3D(fillVertArray, "TRIANGLES", colorVertArray, texVertArray);   // fill shape render function
              }
            }
          }
        } else if (curShape === PConstants.TRIANGLE_STRIP) {    // if TRIANGLE_STRIP was the specified parameter in beginShape
          if (vertArrayLength > 2) {
            for (i = 0; (i+2) < vertArrayLength; i++) {
              lineVertArray = [];
              fillVertArray = [];
              strokeVertArray = [];
              colorVertArray = [];
              texVertArray = [];
              for (j = 0; j < 3; j++) {
                for (k = 0; k < 3; k++) {
                  lineVertArray.push(vertArray[i+j][k]);
                  fillVertArray.push(vertArray[i+j][k]);
                }
              }
              for (j = 0; j < 3; j++) {
                for (k = 3; k < 5; k++) {
                  texVertArray.push(vertArray[i+j][k]);
                }
              }
              for (j = 0; j < 3; j++) {
                for (k = 5; k < 9; k++) {
                  strokeVertArray.push(vertArray[i+j][k+4]);
                  colorVertArray.push(vertArray[i+j][k]);
                }
              }

              if (doFill || usingTexture) {
                fill3D(fillVertArray, "TRIANGLE_STRIP", colorVertArray, texVertArray);
              }
              if (doStroke) {
                line3D(lineVertArray, "LINE_LOOP", strokeVertArray);
              }
            }
          }
        } else if (curShape === PConstants.TRIANGLE_FAN) {
          if (vertArrayLength > 2) {
            for (i = 0; i < 3; i++) {
              cachedVertArray = vertArray[i];
              for (j = 0; j < 3; j++) {
                lineVertArray.push(cachedVertArray[j]);
              }
            }
            for (i = 0; i < 3; i++) {
              cachedVertArray = vertArray[i];
              for (j = 9; j < 13; j++) {
                strokeVertArray.push(cachedVertArray[j]);
              }
            }
            if (doStroke) {
              line3D(lineVertArray, "LINE_LOOP", strokeVertArray);
            }

            for (i = 2; (i+1) < vertArrayLength; i++) {
              lineVertArray = [];
              strokeVertArray = [];
              lineVertArray.push(vertArray[0][0]);
              lineVertArray.push(vertArray[0][1]);
              lineVertArray.push(vertArray[0][2]);

              strokeVertArray.push(vertArray[0][9]);
              strokeVertArray.push(vertArray[0][10]);
              strokeVertArray.push(vertArray[0][11]);
              strokeVertArray.push(vertArray[0][12]);

              for (j = 0; j < 2; j++) {
                for (k = 0; k < 3; k++) {
                  lineVertArray.push(vertArray[i+j][k]);
                }
              }
              for (j = 0; j < 2; j++) {
                for (k = 9; k < 13; k++) {
                  strokeVertArray.push(vertArray[i+j][k]);
                }
              }
              if (doStroke) {
                line3D(lineVertArray, "LINE_STRIP",strokeVertArray);
              }
            }
            if (doFill || usingTexture) {
              fill3D(fillVertArray, "TRIANGLE_FAN", colorVertArray, texVertArray);
            }
          }
        } else if (curShape === PConstants.QUADS) {
          for (i = 0; (i + 3) < vertArrayLength; i+=4) {
            lineVertArray = [];
            for (j = 0; j < 4; j++) {
              cachedVertArray = vertArray[i+j];
              for (k = 0; k < 3; k++) {
                lineVertArray.push(cachedVertArray[k]);
              }
            }
            if (doStroke) {
              line3D(lineVertArray, "LINE_LOOP",strokeVertArray);
            }

            if (doFill) {
              fillVertArray = [];
              colorVertArray = [];
              texVertArray = [];
              for (j = 0; j < 3; j++) {
                fillVertArray.push(vertArray[i][j]);
              }
              for (j = 5; j < 9; j++) {
                colorVertArray.push(vertArray[i][j]);
              }

              for (j = 0; j < 3; j++) {
                fillVertArray.push(vertArray[i+1][j]);
              }
              for (j = 5; j < 9; j++) {
                colorVertArray.push(vertArray[i+1][j]);
              }

              for (j = 0; j < 3; j++) {
                fillVertArray.push(vertArray[i+3][j]);
              }
              for (j = 5; j < 9; j++) {
                colorVertArray.push(vertArray[i+3][j]);
              }

              for (j = 0; j < 3; j++) {
                fillVertArray.push(vertArray[i+2][j]);
              }
              for (j = 5; j < 9; j++) {
                colorVertArray.push(vertArray[i+2][j]);
              }

              if (usingTexture) {
                texVertArray.push(vertArray[i+0][3]);
                texVertArray.push(vertArray[i+0][4]);
                texVertArray.push(vertArray[i+1][3]);
                texVertArray.push(vertArray[i+1][4]);
                texVertArray.push(vertArray[i+3][3]);
                texVertArray.push(vertArray[i+3][4]);
                texVertArray.push(vertArray[i+2][3]);
                texVertArray.push(vertArray[i+2][4]);
              }

              fill3D(fillVertArray, "TRIANGLE_STRIP", colorVertArray, texVertArray);
            }
          }
        } else if (curShape === PConstants.QUAD_STRIP) {
          var tempArray = [];
          if (vertArrayLength > 3) {
            for (i = 0; i < 2; i++) {
              cachedVertArray = vertArray[i];
              for (j = 0; j < 3; j++) {
                lineVertArray.push(cachedVertArray[j]);
              }
            }

            for (i = 0; i < 2; i++) {
              cachedVertArray = vertArray[i];
              for (j = 9; j < 13; j++) {
                strokeVertArray.push(cachedVertArray[j]);
              }
            }

            line3D(lineVertArray, "LINE_STRIP", strokeVertArray);
            if (vertArrayLength > 4 && vertArrayLength % 2 > 0) {
              tempArray = fillVertArray.splice(fillVertArray.length - 3);
              vertArray.pop();
            }
            for (i = 0; (i+3) < vertArrayLength; i+=2) {
              lineVertArray = [];
              strokeVertArray = [];
              for (j = 0; j < 3; j++) {
                lineVertArray.push(vertArray[i+1][j]);
              }
              for (j = 0; j < 3; j++) {
                lineVertArray.push(vertArray[i+3][j]);
              }
              for (j = 0; j < 3; j++) {
                lineVertArray.push(vertArray[i+2][j]);
              }
              for (j = 0; j < 3; j++) {
                lineVertArray.push(vertArray[i+0][j]);
              }
              for (j = 9; j < 13; j++) {
                strokeVertArray.push(vertArray[i+1][j]);
              }
              for (j = 9; j < 13; j++) {
                strokeVertArray.push(vertArray[i+3][j]);
              }
              for (j = 9; j < 13; j++) {
                strokeVertArray.push(vertArray[i+2][j]);
              }
              for (j = 9; j < 13; j++) {
                strokeVertArray.push(vertArray[i+0][j]);
              }
              if (doStroke) {
                line3D(lineVertArray, "LINE_STRIP", strokeVertArray);
              }
            }

            if (doFill || usingTexture) {
              fill3D(fillVertArray, "TRIANGLE_LIST", colorVertArray, texVertArray);
            }
          }
        }
        // If the user didn't specify a type (LINES, TRIANGLES, etc)
        else {
          // If only one vertex was specified, it must be a point
          if (vertArrayLength === 1) {
            for (j = 0; j < 3; j++) {
              lineVertArray.push(vertArray[0][j]);
            }
            for (j = 9; j < 13; j++) {
              strokeVertArray.push(vertArray[0][j]);
            }
            point3D(lineVertArray,strokeVertArray);
          } else {
            for (i = 0; i < vertArrayLength; i++) {
              cachedVertArray = vertArray[i];
              for (j = 0; j < 3; j++) {
                lineVertArray.push(cachedVertArray[j]);
              }
              for (j = 5; j < 9; j++) {
                strokeVertArray.push(cachedVertArray[j]);
              }
            }
            if (doStroke && closeShape) {
              line3D(lineVertArray, "LINE_LOOP", strokeVertArray);
            } else if (doStroke && !closeShape) {
              line3D(lineVertArray, "LINE_STRIP", strokeVertArray);
            }

            // fill is ignored if textures are used
            if (doFill || usingTexture) {
              fill3D(fillVertArray, "TRIANGLE_FAN", colorVertArray, texVertArray);
            }
          }
        }
        // everytime beginShape is followed by a call to
        // texture(), texturing it turned back on. We do this to
        // figure out if the shape should be textured or filled
        // with a color.
        usingTexture = false;
        curContext.useProgram(programObject3D);
        uniformi("usingTexture3d", programObject3D, "uUsingTexture", usingTexture);
      }

      // Reset some settings
      isCurve = false;
      isBezier = false;
      curveVertArray = [];
      curveVertCount = 0;
    }