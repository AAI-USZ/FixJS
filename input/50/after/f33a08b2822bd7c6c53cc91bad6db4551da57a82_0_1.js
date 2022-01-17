function(pos) {
      if (!this.unregisterSquareAt(pos, 'food')) {
        return false;
      }
      console.log('subtracting');
      this.foodCount -= 1;
      return true;
    }