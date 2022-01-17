function (e, language) {
        response.language = language
      console.log('info: ???')
        
        _getRemoteAddress(function (ip) {
          response.ip = ip
          
          _fixHref(response.domain, function (e, href) {
            response.domain = url.parse(href).hostname
            _flush(extend(response, req.query))
            
          })
        })
      }