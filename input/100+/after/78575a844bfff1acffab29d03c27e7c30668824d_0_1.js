function() {
      var _this = this;
      this.currentTrack = 1;
      this.cur = 0;
      this.title = document.title;
      this.$elem.css({
        "display": "block",
        "visibility": "hidden"
      });
      if (this.isJSON(this.settings.trackinfo)) {
        this.trackInfo = $.parseJSON(this.settings.trackinfo);
      } else {
        $.ajax({
          url: this.settings.trackinfo,
          async: false,
          success: function(data) {
            _this.trackInfo = data;
            _this.log(_this.trackInfo);
            _this.duration = _this.parseTime(_this.trackInfo.duration);
            _this.trackInfo = _this.trackInfo.tracks;
            _this.currentMarker = _this.getMarker(_this.currentTrack - 1);
            _this.nextMarker = _this.getMarker(_this.currentTrack);
            return _this.numTracks = parseInt(_this.trackInfo.length, 10);
          }
        });
      }
      this.$elem.children().wrapAll('<ul id="tapebox"/>');
      this.tapebox = $("#tapebox");
      this.tapebox.wrapAll('<div id="displaybox"/>');
      this.tapebox.prepend("<li><img src='" + this.settings.placeholder + "' width='125'></li>");
      $("#displaybox").prepend("<img src='" + this.settings.imagesFolder + "bg.png'>");
      this.$elem.prepend("<div id='shadowleft' class='shadow'></div>\n<div id='shadowright' class='shadow'></div>\n<div id='playhead'>\n  <img src='" + this.settings.imagesFolder + "playhead_overlay.png'>\n  <div id='playtoggle' class='hover'></div>\n</div>");
      this.$elem.append("<div id='displaybox_overlay'>\n  <img src='" + this.settings.imagesFolder + "displaybox_overlay.png' />\n</div>");
      if (this.settings.tooltips) {
        this.$elem.append("<div class='tooltip'>" + this.settings.title + "</div>");
        this.tooltip = $(".tooltip");
      }
      if (this.settings.debug) {
        this.$elem.append('<span id="skipbackward">REV</span>&nbsp;-&nbsp;<span id="skipforward">FWD</span>');
      }
      this.shadowleft = $("#shadowleft");
      this.shadowright = $("#shadowright");
      this.playtoggle = $("#playtoggle");
      soundManager.onready(function() {
        soundManager.createSound({
          id: "juke",
          url: $.trim(_this.settings.audio),
          onplay: function() {
            _this.playtoggle.addClass('playing');
            document.title = "\u25B6 " + _this.settings.title + " - " + _this.title;
            if (_this.cur === 0) {
              _this.tapeOffset = _this.tapebox.parent().width() / 2 - 62 - 125;
              _this.tapebox.animate({
                "left": _this.tapeOffset
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
        _this.adjustShadows();
        _this.tapebox.css({
          left: _this.tapebox.parent().width() / 2 - 62
        });
        _this.$elem.css("visibility", "visible");
        return $(window).resize(function() {
          var tapeOffset;
          _this.adjustShadows();
          tapeOffset = _this.tapebox.parent().width() / 2 - 62;
          if (_this.cur > 0) {
            tapeOffset -= _this.currentTrack * 125;
          }
          return _this.tapebox.css({
            left: tapeOffset
          });
        });
      });
      return this;
    }