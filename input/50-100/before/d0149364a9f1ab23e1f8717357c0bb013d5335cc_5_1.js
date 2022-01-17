function(options) {

      var self = this;
      this._lastFmConfig = this.appConfig.getLastFm();
      this._lastFmApi = options.lastFmApi;
      this._nowPlayingCollection = options.nowPlayingCollection;

      this.bindTo(this._lastFmConfig, "change:sessionKey", this.handlePlayScrobbleChange, this);
      this.bindTo(this._lastFmConfig, "change:playScrobbleEnabled", this.handlePlayScrobbleChange, this);
      
      this.handlePlayScrobbleChange(this._lastFmConfig);
    }