function(pos, type) {
      if (this.world[pos.x][pos.y][type]) {
        return false;
      }
      this.world[pos.x][pos.y][type] = true;
      return true;
    }