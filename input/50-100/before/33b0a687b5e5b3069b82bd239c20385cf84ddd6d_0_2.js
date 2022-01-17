function(map, options) {
          this.map = map;
          this._doubleClick = MM.bind(this.doubleClick, this);
          MM.addEvent(map.parent, 'dblclick', this._doubleClick);

          this.options = {};
      }