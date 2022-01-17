function gh_addPlace(uri, callback) {
    var place = {
      uri: uri,
      // Set the title to the URI for now, until a real title is received.
      title: uri
    };
    this.db.savePlace(place, callback);
  }