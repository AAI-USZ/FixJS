function(options) {
      this.addService(new LastFmScrobbleService(), options);
      this.addService(new AnalyticsService(), options);
    }