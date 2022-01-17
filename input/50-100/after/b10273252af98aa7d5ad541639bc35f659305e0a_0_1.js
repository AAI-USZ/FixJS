function (e) {
      if (!this.shown) return

      switch(e.keyCode) {
        case 9: // tab
        case 13: // enter
        case 27: // escape
          e.preventDefault();
          break;

        case 38: // up arrow
          if (e.type != 'keydown') break;
          e.preventDefault();
          this.prev();
          break;

        case 40: // down arrow
          if (e.type != 'keydown') break;
          e.preventDefault();
          this.next();
          break;
      }

      e.stopPropagation();
    }