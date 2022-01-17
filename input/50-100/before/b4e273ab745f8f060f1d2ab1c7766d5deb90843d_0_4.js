function (e, language) {
        response.language = language
        
        _getRemoteAddress(function (e, remoteAddress) {
          response.geo = { ip: remoteAddress }
          
          _fixHref(req.headers.host, function (e, href) {
            response.domain = url.parse(href).hostname
            
            _flush(extend(response, req.query))
            
          })
        })
      }