function(event) {
      var pos;
      pos = window.findClickPos(event);
      this.bombs.push(new Bomb(pos.x, pos.y));
      if (window.FONTBOMB_PREVENT_DEFAULT) return event.preventDefault();
    }