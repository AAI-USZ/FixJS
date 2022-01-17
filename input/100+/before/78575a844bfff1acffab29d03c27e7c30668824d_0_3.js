function() {
        soundManager.createSound({
          id: "juke",
          url: $.trim(_this.settings.audio),
          onplay: function() {
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
          },
          onpause: function() {
            _this.playtoggle.removeClass('playing');
            return document.title = _this.title;
          },
          onfinish: function() {
            _this.playtoggle.removeClass('playing');
            return document.title = _this.title;
          },
          whileplaying: function() {
            _this.cur = parseInt(soundManager.getSoundById("juke").position / 1000, 10);
            if (_this.cur >= _this.duration) {
              soundManager.pause("juke");
            }
            if (_this.cur >= _this.nextMarker) {
              _this.currentTrack += 1;
              if (_this.currentTrack < _this.numTracks) {
                _this.currentMarker = _this.nextMarker;
                _this.nextMarker = _this.getMarker(_this.currentTrack);
              } else {
                _this.nextMarker = _this.duration;
              }
              _this.tapebox.animate({
                "left": "-=125px"
              }, _this.settings.animationSpeed, "swing");
              if (_this.settings.tooltips) {
                _this.updateInfo(_this.trackInfo[_this.currentTrack - 1].artist, _this.trackInfo[_this.currentTrack - 1].track);
              }
            }
            return _this.log("total: " + _this.duration + ", currently at: " + _this.cur + ", next marker: " + _this.nextMarker);
          }
        });
        _this.playtoggle.click(function() {
          return soundManager.togglePause("juke");
        });
        if (_this.settings.debug) {
          $("#skipforward").click(function() {
            return soundManager.getSoundById("juke").setPosition(soundManager.getSoundById("juke").position + 5000);
          });
          $("#skipbackward").click(function() {
            return soundManager.getSoundById("juke").setPosition(soundManager.getSoundById("juke").position - 5000);
          });
        }
        _this.adjustDimensions();
        return _this.$elem.css("visibility", "visible");
      }