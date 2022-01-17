function(data) {
            _this.trackInfo = data;
            _this.log(_this.trackInfo);
            _this.duration = _this.parseTime(_this.trackInfo.duration);
            _this.trackInfo = _this.trackInfo.tracks;
            _this.currentMarker = _this.getMarker(_this.currentTrack - 1);
            _this.nextMarker = _this.getMarker(_this.currentTrack);
            return _this.numTracks = parseInt(_this.trackInfo.length, 10);
          }