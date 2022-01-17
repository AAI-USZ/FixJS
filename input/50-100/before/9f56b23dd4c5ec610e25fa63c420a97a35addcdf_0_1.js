function() {
      if (arguments.length === 8) { // curve(x1, y1, x2, y2, x3, y3, x4, y4)
        p.beginShape();
        p.curveVertex(arguments[0], arguments[1]);
        p.curveVertex(arguments[2], arguments[3]);
        p.curveVertex(arguments[4], arguments[5]);
        p.curveVertex(arguments[6], arguments[7]);
        p.endShape();
      }
    }