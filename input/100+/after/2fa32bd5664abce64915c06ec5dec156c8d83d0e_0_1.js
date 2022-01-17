function(query) {
    if (!query) return '';
    query = querystring.parse(query);
    for (var name in query) {
      var value = query[name];
      if(Array.isArray(value)) {
        query[name] = value.map(decodeLocation);
      } else {
        query[name] = decodeLocation(value);
      }
    }
    return querystring.stringify(query);
  }