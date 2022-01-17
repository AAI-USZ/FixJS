function() {

    function Plugin(elem, options) {
      if (options == null) {
        options = {};
      }
      this.elem = elem;
      this.$elem = $(elem);
      this.options = options;
    }

    Plugin.prototype.defaults = {
      title: "Mixtape",
      imagesFolder: "public/images/juke/",
      soundmanagerFolder: "public/swf/",
      placeholder: "images/juke/default.jpg",
      trackinfo: "trackinfo.json",
      SM2: "public/docs/js/min/soundmanager2.min.js",
      itunes: true,
      audio: "mix.mp3",
      tooltips: false,
      animationSpeed: 400,
      debug: false
    };

    Plugin.prototype.load = function() {
      var _this = this;
      $.ajaxSetup({
        xhr: function() {
          if (window.ActiveXObject) {
            return new ActiveXObject("Microsoft.XMLHTTP");
          } else {
            return new XMLHttpRequest();
          }
        }
      });
      this.settings = $.extend({}, this.defaults, this.options);
      window.SM2_DEFER = true;
      return $.ajax({
        url: this.settings.SM2,
        success: function() {
          window.soundManager = new SoundManager();
          soundManager.url = _this.settings.soundmanagerFolder + 'soundmanager2_flash_xdomain/';
          soundManager.useHTML5Audio = true;
          soundManager.autoLoad = true;
          soundManager.preferFlash = false;
          soundManager.consoleOnly = true;
          soundManager.debugMode = _this.settings.debug;
          soundManager.wmode = 'transparent';
          soundManager.beginDelayedInit();
          return _this.init();
        }
      });
    };

    Plugin.prototype.init = function() {
      var _this = this;
      $(window).resize(function() {
        this.adjustDimensions();
        if (this.cur > 0) {
          tapeOffset -= this.currentTrack * 125;
        }
        return tapebox.css({
          left: tapeOffset
        });
      });
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
            _this.duration = parseInt(_this.trackInfo.duration, 10);
            _this.trackInfo = _this.trackInfo.tracks;
            _this.currentMarker = _this.getMarker(_this.currentTrack - 1);
            _this.nextMarker = _this.getMarker(_this.currentTrack);
            return _this.numTracks = parseInt(_this.trackInfo.length, 10);
          }
        });
      }
      this.$elem.children().wrapAll('<ul id="tapebox"/>');
      this.tapebox = $("#tapebox");
      $("#tapebox").wrapAll('<div id="displaybox"/>');
      $("#tapebox").prepend('<li><img src="' + this.settings.placeholder + '" width="125"></li>');
      $("#displaybox").prepend('<img src="' + this.settings.imagesFolder + 'bg.png" alt="">');
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
      });
      return this;
    };

    Plugin.prototype.log = function(msg) {
      if (this.settings.debug) {
        return typeof console !== "undefined" && console !== null ? console.log(msg) : void 0;
      }
    };

    Plugin.prototype.isJSON = function(str) {
      if (!str.length) {
        false;
      }
      str = str.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@');
      str = str.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
      str = str.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
      return /^[\],:{}\s]*$/.test(str);
    };

    Plugin.prototype.adjustDimensions = function() {
      this.shadowleft.css({
        right: this.shadowleft.parent().width() / 2 + 63
      });
      this.shadowright.css({
        left: this.shadowright.parent().width() / 2 + 64
      });
      return this.tapebox.css({
        left: this.tapebox.parent().width() / 2 - 62
      });
    };

    Plugin.prototype.getMarker = function(index) {
      var marker, min, minutePattern, sec, secondPattern, testPattern;
      marker = this.trackInfo[index].marker;
      testPattern = /:/;
      minutePattern = /^\d*(?=:)/;
      secondPattern = /[0-5][0-9]$/;
      if (testPattern.test(marker)) {
        min = parseInt(minutePattern.exec(marker), 10);
        sec = parseInt(secondPattern.exec(marker), 10);
        return min * 60 + sec;
      } else {
        return parseInt(this.trackInfo[index].marker, 10);
      }
    };

    Plugin.prototype.updateInfo = function(artist, track) {
      var newString,
        _this = this;
      newString = artist + " - <em class='track'>" + track + "</em>";
      if (this.settings.itunes) {
        return $.ajax({
          url: 'http://api.wipmania.com/jsonp?callback=?',
          dataType: 'jsonp',
          success: function(data) {
            var countryCode, queryString, term;
            countryCode = data.address.country_code;
            term = encodeURIComponent(artist + " " + track);
            queryString = "http://itunes.apple.com/search?entity=song&country=" + countryCode + "&term=" + term + "&limit=5&callback=?";
            return $.getJSON(queryString, function(data) {
              var link;
              if (data.resultCount === 1) {
                link = data.results[0].trackViewUrl;
              } else if (data.resultCount > 1) {
                $.each(data.results, function() {
                  if (_this.trackName === track) {
                    return link = _this.trackViewUrl;
                  }
                });
              }
              if (link != null) {
                newString += " (<a href='" + link + "' class='itunes-link'>iTunes</a>)";
              }
              return _this.tooltip.fadeOut(function() {
                _this.tooltip.html(newString);
                return _this.tooltip.fadeIn();
              });
            });
          }
        });
      } else {
        return this.tooltip.fadeOut(function() {
          _this.tooltip.html(newString);
          return _this.tooltip.fadeIn();
        });
      }
    };

    return Plugin;

  }