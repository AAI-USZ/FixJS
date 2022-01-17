function decodeRequestV2(req) {
    var parts = utils.decodeSymbolUrl(req.url);

    if(!parts) {
      var rawUrl = decodeUrl(req.url || '/', req.headers && req.headers.referer)
      if(!rawUrl) return;

      parts = parseUrl(rawUrl);
      if(!parts) {
        throw new Error('rawUrl<%s> invalid', rawUrl)
      }

      if(parts.query) {
        parts.query = parts.query.split('&').map(function(param){
            var pair = param.split('=');
            var value = decodeURIComponent(pair[1]);
            if(value.indexOf('px!=') >= 0) {
              return pair[0] + '=' + encodeURIComponent(decodeUrl(value))
            }
            return param;
        }).join('&');
      }
    }

    reqOptions = {
      method: req.method
    , host: parts.domain
    , headers: decodeRequestHeadersV2(req.headers)
    , path: parts.path + parts.query + parts.anchor
    , isSecure: parts.scheme == 'https'
    , port: parts.port || parts.scheme == 'https' && 443 || 80
    }

    return reqOptions;

  }