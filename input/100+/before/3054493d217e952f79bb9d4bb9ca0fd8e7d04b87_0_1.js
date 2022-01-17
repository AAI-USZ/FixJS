function(url, params) {
    if (typeof url !== 'string') return url;
    
    var a   = document.createElement('a'),
        uri = new this();
    
    a.href = url;
    
    uri.protocol = a.protocol + '//';
    uri.hostname = a.hostname;
    uri.port     = a.port;
    uri.pathname = a.pathname;
    
    var query = a.search.replace(/^\?/, ''),
        pairs = query ? query.split('&') : [],
        n     = pairs.length,
        data  = {},
        parts;
    
    while (n--) {
      parts = pairs[n].split('=');
      data[decodeURIComponent(parts[0] || '')] = decodeURIComponent(parts[1] || '');
    }
    if (typeof params === 'object') Faye.extend(data, params);
    
    uri.params = data;
    
    return uri;
  }