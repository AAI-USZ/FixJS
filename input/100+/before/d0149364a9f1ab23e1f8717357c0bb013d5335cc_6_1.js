function() {
      this.bindTo(this.vent, "nowplaying:lastfm:popover:enabled", this.showLastFmButton, this);
      this.bindTo(this.vent, "nowplaying:refresh:background", this.handleBackgroundRefresh, this);
      this.bindTo(this.vent, "lastfm:track:love:success", this.showShareAnimation, this);
      this.bindTo(this.vent, "nowplaying:like", this.handleLikeCountChange, this);
      this.bindTo(this.lastFmConfig, "change:sessionKey", this.handleLastFmShareChange, this);
      this.bindTo(this.lastFmConfig, "change:likeShareEnabled", this.handleLastFmShareChange, this);
      this.bindTo(this.lastFmConfig, "change:likeScrobbleEnabled", this.handleLastFmShareChange, this);
    }