function(nowPlayingModel) {
      if (!this._lastFmConfig.isPlayScrobbleEnabled() || this._audioEl.paused || _.isUndefined(nowPlayingModel) ||
        nowPlayingModel.get("airBreak")) { return; }
    
      var self = this,
        track = nowPlayingModel.get("songTitle"),
        artist = nowPlayingModel.get("artist"),
        album = nowPlayingModel.get("album"),
        timePlayed = nowPlayingModel.get("timePlayed");

      // Skip processing if empty track, artist, or album
      if (!_.isEmpty(track) && !_.isEmpty(artist) && !_.isEmpty(album)) {

        this._lastFmApi.scrobbleTrack(track, artist, album, false, timePlayed)
          .then(
            function() {
              self.vent.trigger("lastfm:track:scrobble:success", nowPlayingModel);
              self.vent.trigger("analytics:trackevent", "LastFm", "Scrobble", nowPlayingModel.toDebugString());
            },
            function(resp, error, options) {
              console.warn("[LastFmScrobbleService Error] %s track.scrobble %s", resp.message, nowPlayingModel.toDebugString(), resp, options);
              self.vent.trigger("lastfm:track:scrobble:fail", resp, nowPlayingModel, options);
              self.vent.trigger("analytics:trackevent", "LastFm", "Scrobble", "Error", error);
            }
          );

      }
    }