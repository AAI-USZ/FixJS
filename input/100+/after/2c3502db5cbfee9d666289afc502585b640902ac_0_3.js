function(x, y, moveTo) {
      var vert = [];

      if (firstVert) { firstVert = false; }
      vert["isVert"] = true;

      vert[0] = x;
      vert[1] = y;
      vert[2] = 0;
      vert[3] = 0;
      vert[4] = 0;

      // fill and stroke color
      vert[5] = currentFillColor;
      vert[6] = currentStrokeColor;

      vertArray.push(vert);
      if (moveTo) {
        vertArray[vertArray.length-1]["moveTo"] = moveTo;
      }
    }