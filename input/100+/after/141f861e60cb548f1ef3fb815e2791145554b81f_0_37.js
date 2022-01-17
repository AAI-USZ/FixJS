function(str, x, y, z, align) {
      // handle case for 3d text
      if (textcanvas === undef) {
        textcanvas = document.createElement("canvas");
      }
      var oldContext = curContext;
      curContext = textcanvas.getContext("2d");
      curContext.font = curTextFont.css;
      var textWidth = curTextFont.measureTextWidth(str);
      textcanvas.width = textWidth;
      textcanvas.height = curTextSize;
      curContext = textcanvas.getContext("2d"); // refreshes curContext
      curContext.font = curTextFont.css;
      curContext.textBaseline="top";

      // paint on 2D canvas
      Drawing2D.prototype.text$line(str,0,0,0,PConstants.LEFT);

      // use it as a texture
      var aspect = textcanvas.width/textcanvas.height;
      curContext = oldContext;

      curContext.bindTexture(curContext.TEXTURE_2D, textTex);
      curContext.texImage2D(curContext.TEXTURE_2D, 0, curContext.RGBA, curContext.RGBA, curContext.UNSIGNED_BYTE, textcanvas);
      curContext.texParameteri(curContext.TEXTURE_2D, curContext.TEXTURE_MAG_FILTER, curContext.LINEAR);
      curContext.texParameteri(curContext.TEXTURE_2D, curContext.TEXTURE_MIN_FILTER, curContext.LINEAR);
      curContext.texParameteri(curContext.TEXTURE_2D, curContext.TEXTURE_WRAP_T, curContext.CLAMP_TO_EDGE);
      curContext.texParameteri(curContext.TEXTURE_2D, curContext.TEXTURE_WRAP_S, curContext.CLAMP_TO_EDGE);
      // If we don't have a power of two texture, we can't mipmap it.
      // curContext.generateMipmap(curContext.TEXTURE_2D);

      // horizontal offset/alignment
      var xOffset = 0;
      if (align === PConstants.RIGHT) {
        xOffset = -textWidth;
      } else if(align === PConstants.CENTER) {
        xOffset = -textWidth/2;
      }
      var model = new PMatrix3D();
      var scalefactor = curTextSize * 0.5;
      model.translate(x+xOffset-scalefactor/2, y-scalefactor, z);
      model.scale(-aspect*scalefactor, -scalefactor, scalefactor);
      model.translate(-1, -1, -1);
      model.transpose();

      var view = new PMatrix3D();
      view.scale(1, -1, 1);
      view.apply(modelView.array());
      view.transpose();

      curContext.useProgram(programObject2D);
      vertexAttribPointer("aVertex2d", programObject2D, "aVertex", 3, textBuffer);
      vertexAttribPointer("aTextureCoord2d", programObject2D, "aTextureCoord", 2, textureBuffer);
      uniformi("uSampler2d", programObject2D, "uSampler", [0]);

      uniformi("uIsDrawingText2d", programObject2D, "uIsDrawingText", true);

      uniformMatrix("uModel2d", programObject2D, "uModel", false,  model.array());
      uniformMatrix("uView2d", programObject2D, "uView", false, view.array());
      uniformf("uColor2d", programObject2D, "uColor", fillStyle);
      curContext.bindBuffer(curContext.ELEMENT_ARRAY_BUFFER, indexBuffer);
      curContext.drawElements(curContext.TRIANGLES, 6, curContext.UNSIGNED_SHORT, 0);
    }