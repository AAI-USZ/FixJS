function (value) {
      var r = this.options.ratio,
          o = value.origin,
          s = value.size;

      // Adjust size to match the ratio
      if ((s[0] / s[1]) < r) {
         s[1] = Math.round(s[0] / r);
      }
      else {
         s[0] = Math.round(s[1] * r);
      }

      // Adjust origin in case the size changed
      if (!this.dragging && this.firstOrigin) {
         if (o[0] < this.firstOrigin[0]) {
            o[0] = this.firstOrigin[0] - s[0];
         }
         if (o[1] < this.firstOrigin[1]) {
            o[1] = this.firstOrigin[1] - s[1];
         }
      }

      return {origin: o, size: s};
   }