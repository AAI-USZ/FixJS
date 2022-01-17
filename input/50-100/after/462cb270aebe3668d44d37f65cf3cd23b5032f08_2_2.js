function pqMin(keyOf) {
        if (!this.length) {
          return -1;
        }
        keyOf = keyOf || identity;

        var imin = 0;
        var amin = keyOf(this[0]);
        var i;
        for (i = 1; i < this.length; ++i) {
          var a = keyOf(this[i]);
          if (a < amin) {
            amin = a;
            imin = i;
          }
        }

        return imin;
      }