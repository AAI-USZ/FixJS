function(pos, type) {
      var _ref;
      if (!this.world[pos.x][pos.y][type]) {
        return false;
      }
      if ((_ref = this.world[pos.x][pos.y][type]) != null) {
        _ref.hide();
      }
      this.world[pos.x][pos.y][type] = null;
      return true;
    }