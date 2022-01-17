function(str) {
        this.checkMatrix(2);
        var pieces = [];
        str.replace(/\s*(\w+)\((.*?)\)/g, function(all) {
          // get a list of transform definitions
          pieces.push(p.trim(all));
        });
        if (pieces.length === 0) {
          return null;
        }

        for (var i = 0, j = pieces.length; i < j; i++) {
          var m = getCoords(pieces[i]);

          if (pieces[i].indexOf("matrix") !== -1) {
            this.matrix.set(m[0], m[2], m[4], m[1], m[3], m[5]);
          } else if (pieces[i].indexOf("translate") !== -1) {
            var tx = m[0];
            var ty = (m.length === 2) ? m[1] : 0;
            this.matrix.translate(tx,ty);
          } else if (pieces[i].indexOf("scale") !== -1) {
            var sx = m[0];
            var sy = (m.length === 2) ? m[1] : m[0];
            this.matrix.scale(sx,sy);
          } else if (pieces[i].indexOf("rotate") !== -1) {
            var angle = m[0];
            if (m.length === 1) {
              this.matrix.rotate(p.radians(angle));
            } else if (m.length === 3) {
              this.matrix.translate(m[1], m[2]);
              this.matrix.rotate(p.radians(m[0]));
              this.matrix.translate(-m[1], -m[2]);
            }
          } else if (pieces[i].indexOf("skewX") !== -1) {
            this.matrix.skewX(parseFloat(m[0]));
          } else if (pieces[i].indexOf("skewY") !== -1) {
            this.matrix.skewY(m[0]);
          } else if (pieces[i].indexOf("shearX") !== -1) {
            this.matrix.shearX(m[0]);
          } else if (pieces[i].indexOf("shearY") !== -1) {
            this.matrix.shearY(m[0]);
          }
        }
        return this.matrix;
      }