function(x, y, u, v) {
      var vert = [];

      if (firstVert) { firstVert = false; }
      vert["isVert"] = true;

      vert[0] = x;
      vert[1] = y;
      vert[2] = 0;
      vert[3] = u;
      vert[4] = v;

      // fill and stroke color
      vert[5] = currentFillColor;
      vert[6] = currentStrokeColor;

      vertArray.push(vert);
    }