function(map, mapModel) {
          this.map = map;
          this.mapModel = mapModel;
          this._mouseWheel = MM.bind(this.mouseWheel, this);
    
          this._zoomDiv = document.body.appendChild(
                            document.createElement('div'));
          this._zoomDiv.style.cssText = 'visibility:hidden;top:0;' +
                                        'height:0;width:0;overflow-y:scroll';
          var innerDiv = this._zoomDiv.appendChild(
                            document.createElement('div'));
          innerDiv.style.height = '2000px';
          MM.addEvent(map.parent, 'mousewheel', this._mouseWheel);
      }