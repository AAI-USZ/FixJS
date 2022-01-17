function pqPopMax(keyOf) {
        var i = this.pqMax(keyOf);
        if (i < 0) {
          return null;
        }
        var a = this[i];
        this.splice(i, 1);
        return a;
      }