function(pos, type) {
      var _ref1;
      if (!this.world[pos.x][pos.y][type]) {
        return false;
      }
      if ((_ref1 = this.world[pos.x][pos.y][type]) != null) {
        _ref1.hide();
      }
      this.world[pos.x][pos.y][type] = null;
      return true;
    }