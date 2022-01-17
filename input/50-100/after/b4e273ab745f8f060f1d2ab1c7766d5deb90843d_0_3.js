function (e, href) {
            response.domain = url.parse(href).hostname
            _flush(extend(response, req.query))
            
          }