function(application, options) {
    options || (options = {});

    this.app = application;

    // Controller State
    this.collections = {
      nowPlaying: options.nowPlayingCollection || new NowPlayingCollection()
    };
    this.models = {
      show: new ShowModel()
    };
    // Player Region is static across all routers
    this.views = {
      player: new PlayerView({
        audioElement: options.audioElement,
        showModel: this.models.show
      })
    };
    application.footer.show(this.views.player);

    _.bindAll(this, "handleFetchShowPoll");
    this.handleFetchShowPoll();
    //this.enableFetchNowPlayingPoll(60000);
  }