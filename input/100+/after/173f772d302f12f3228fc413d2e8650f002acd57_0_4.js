function (value) {
      var r = this.options.ratio,
          i = this.imageSize,
          m = this.options.minSize,
          o = value.origin,
          s = value.size;

      // Match minSize if needed
      if (m) {
         s = [Math.min(i[0], Math.max(m[0], s[0])),
              Math.min(i[1], Math.max(m[1], s[1]))];
      }

      // Adjust size to match the ratio
      if (r) {
        if ((s[0] / s[1]) < r) {
           s[1] = Math.round(s[0] / r);
        }
        else {
           s[0] = Math.round(s[1] * r);
        }
      }

      // Adjust origin in case the size changed
      if (!this.dragging) {
         if (!this.firstOrigin) {
            // firstOrigin refers to the original clic position
            this.firstOrigin = [Math.max(0, Math.min(i[0], o[0])),
                                Math.max(0, Math.min(i[1], o[1]))];
         }
         else {
            if (o[0] < this.firstOrigin[0]) {
               o[0] = this.firstOrigin[0] - s[0];
            }
            if (o[1] < this.firstOrigin[1]) {
               o[1] = this.firstOrigin[1] - s[1];
            }
         }
      }

      // The real crop area origin isn't always equal to firstOrigin
      o[0] = Math.max(0, Math.min(i[0] - s[0], o[0]));
      o[1] = Math.max(0, Math.min(i[1] - s[1], o[1]));

      return {origin: o, size: s};
   }