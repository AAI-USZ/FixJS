function(v, min, max) {
        if (v != null) {
          if ((min != null) && v < min) {
            return min;
          } else if ((max != null) && v > max) {
            return max;
          } else {
            return v;
          }
        } else {
          return 0;
        }
      }