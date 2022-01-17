function gh_addVisit(uri) {
    this.addPlace(uri);
    var visit = {
      uri: uri,
      timestamp: new Date().getTime()
    };
    this.db.saveVisit(visit);
  }