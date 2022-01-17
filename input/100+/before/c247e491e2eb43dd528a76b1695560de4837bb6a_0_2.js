function getBounds(bounds) {
          // TODO move the getBounds into utility/core classes
          var frame = timeline[currentFrame - 1];
          var xMin = 0, yMin = 0, xMax = 0, yMax = 0;
          for (var i in frame) {
            if (!+i)
              continue;
            var character = frame[i].character;
            var b = character.bounds || character.getBounds(this);
            xMin = Math.min(xMin, b.xMin);
            yMin = Math.min(yMin, b.yMin);
            xMax = Math.max(xMax, b.xMax);
            yMax = Math.max(yMax, b.yMax);
          }
          if (!bounds || bounds === this)
            return {xMin: xMin, yMin: yMin, xMax: xMax, yMax: yMax};

          var pt1 = bounds.globalToLocal(
            this.localToGlobal({x: xMin, y: yMin}));
          var pt2 = bounds.globalToLocal(
            this.localToGlobal({x: xMax, y: yMin}));
          var pt3 = bounds.globalToLocal(
            this.localToGlobal({x: xMax, y: yMax}));
          var pt4 = bounds.globalToLocal(
            this.localToGlobal({x: xMin, y: yMax}));

          return {
            xMin: Math.min(pt1.x, pt2.x, pt3.x, pt4.x),
            yMin: Math.min(pt1.y, pt2.y, pt3.y, pt4.y),
            xMax: Math.max(pt1.x, pt2.x, pt3.x, pt4.x),
            yMax: Math.max(pt1.y, pt2.y, pt3.y, pt4.y)
          };
        }