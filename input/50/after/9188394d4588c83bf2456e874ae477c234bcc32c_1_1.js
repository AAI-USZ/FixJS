function places_getTopSites(maximum, callback) {
    // Get the top 20 sites
    this.db.getPlacesByFrecency(maximum, callback);
  }