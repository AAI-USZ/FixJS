function (e, expires) {
    response.expires = expires
    
    //_getAgent(req.headers['user-agent'], 2, function (e, useragent) {
      //response.useragent = useragent
      
      _getLanguage(function (e, language) {
        response.language = language
      console.log('info: ???')
        
        _getRemoteAddress(function (ip) {
          response.ip = ip
          
          _fixHref(response.domain, function (e, href) {
            response.domain = url.parse(href).hostname
            _flush(extend(response, req.query))
            
          })
        })
      })
    //})
  }