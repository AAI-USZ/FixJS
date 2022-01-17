function() {
            var tapeOffset;
            _this.playtoggle.addClass('playing');
            document.title = "\u25B6 " + _this.settings.title + " - " + _this.title;
            if (_this.cur === 0) {
              tapeOffset = _this.tapebox.parent().width() / 2 - 62 - 125;
              _this.tapebox.animate({
                "left": tapeOffset
              }, _this.settings.animationSpeed, "swing");
              if (_this.settings.tooltips) {
                return _this.updateInfo(_this.trackInfo[_this.currentTrack - 1].artist, _this.trackInfo[_this.currentTrack - 1].track);
              }
            }
          }