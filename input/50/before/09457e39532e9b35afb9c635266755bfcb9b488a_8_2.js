function parseQuery(query) {
    var isRE = query.match(/^\/(.*)\/$/);
    return isRE ? new RegExp(isRE[1]) : query;
  }