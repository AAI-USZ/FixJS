function(pair) {
      pair.x %= this.squaresX;
      pair.y %= this.squaresY;
      if (pair.x < 0) {
        pair.x = this.squaresX - 1;
      }
      if (pair.y < 0) {
        pair.y = this.squaresY - 1;
      }
      return pair;
    }