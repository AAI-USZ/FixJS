function gh_addVisit(uri, callback) {
    this.addPlace(uri);
    var visit = {
      uri: uri,
      timestamp: new Date().getTime()
    };
    this.db.saveVisit(visit, callback);
  }