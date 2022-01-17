function(source) {
    if (typeof source == 'string')
      return source;

    if (source.query && source.query.DomainName)
      return source.query.DomainName;

    if (source.headers && source.headers.host) {
      var host = source.headers.host;
      var domainNameFromHost = Domain.getNameFromHost(host);
      if (domainNameFromHost)
        return domainNameFromHost;
    }

    if (source.url) {
      var domainNameFromPath = Domain.getNameFromPath(source.url);
      if (domainNameFromPath)
        return domainNameFromPath;
    }

    throw new Error('no domain name');
  }