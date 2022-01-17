function(options) {
    options = options || {};
    var domain = options.domain
      , hostname = '';

    if(geddy.config.hostname) {
      domain = domain || geddy.config.hostname;
    }

    if(options.subdomain) {
      hostname += options.subdomain + '.';
    }
    hostname += domain;

    // Add port if one is given
    if(options.port) {
      hostname += ':' + options.port;
    }

    // Add slash if nothing else is being added to the url
    if(options.trailingSlash && !options.controller && !options.id && !options.action) {
      hostname += '/';
    }

    return hostname;
  }