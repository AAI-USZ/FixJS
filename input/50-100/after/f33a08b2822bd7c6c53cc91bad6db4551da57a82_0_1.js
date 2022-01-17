function(pos, type) {
      if (!this.squareHasType(type, pos)) {
        return false;
      }
      this.graphics.hideEntity(this.world[pos.x][pos.y][type]);
      this.world[pos.x][pos.y][type] = null;
      return true;
    }