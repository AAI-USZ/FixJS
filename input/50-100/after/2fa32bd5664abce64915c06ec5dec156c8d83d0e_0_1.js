function(value) {
    return value.replace(HOST_PATTERN,
      function(full, scheme, domain, _, suffix) {
        return scheme + decodeHost(domain) + (suffix || '');
    });
  }