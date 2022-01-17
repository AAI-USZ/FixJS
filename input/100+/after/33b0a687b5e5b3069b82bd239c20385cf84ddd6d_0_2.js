function(map, mapModel, guideModel, options) {
          this.map = map;
          this.mapModel = mapModel;
          this.guideModel = guideModel;
          options = options || {};

          // Fail early if this isn't a touch device.
          if (!this.isTouchable()) return false;

          this._touchStartMachine = MM.bind(this.touchStartMachine, this);
          this._touchMoveMachine = MM.bind(this.touchMoveMachine, this);
          this._touchEndMachine = MM.bind(this.touchEndMachine, this);
          MM.addEvent(map.parent, 'touchstart',
                      this._touchStartMachine);
          MM.addEvent(map.parent, 'touchmove',
                      this._touchMoveMachine);
          MM.addEvent(map.parent, 'touchend',
                      this._touchEndMachine);

          this.options = {};
          this.options.snapToZoom = options.snapToZoom || true;
      }