function(query) {
    if (!query) return '';
    query = querystring.parse(query);
    for (var name in query) {
      query[name] = query[name].replace(HOST_PATTERN,
        function(full, scheme, domain, _, suffix) {
          return scheme + decodeHost(domain) + (suffix || '');
      });
    }
    return querystring.stringify(query);
  }