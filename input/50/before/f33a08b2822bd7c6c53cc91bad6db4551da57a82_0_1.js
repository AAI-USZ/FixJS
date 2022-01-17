function(pos) {
      if (!this.unregisterSquareAt(pos, 'food')) {
        return false;
      }
      this.foodCount -= 1;
      return true;
    }