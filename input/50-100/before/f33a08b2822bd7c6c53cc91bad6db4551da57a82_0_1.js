function(pos, type) {
      this.graphics.hideEntity(this.world[pos.x][pos.y][type]);
      this.world[pos.x][pos.y][type] = null;
      return true;
    }