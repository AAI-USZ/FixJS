function pqMax(keyOf) {
        if (!this.length) {
          return -1;
        }
        keyOf = keyOf || identity;

        var iMax = 0;
        var aMax = keyOf(this[0]);
        var i;
        for (i = 1; i < this.length; ++i) {
          var a = keyOf(this[i]);
          if (a > aMax) {
            aMax = a;
            iMax = i;
          }
        }

        return iMax;
      }