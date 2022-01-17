function places_getTopSites(callback) {
    // Get the top 20 sites
    this.db.getPlacesByFrecency(20, callback);
  }