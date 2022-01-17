function(map, guideModel, options) {
          this.map = map;
          this.guideModel = guideModel;
          this._doubleClick = MM.bind(this.doubleClick, this);
          MM.addEvent(map.parent, 'dblclick', this._doubleClick);

          this.options = {};
      }