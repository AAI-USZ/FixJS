function() {
                _this.debug("hook outof " + _this.config.path + ":" + filename);
                if (_this.config.parent) {
                  return _this.config = _this.config.parent;
                }
              }