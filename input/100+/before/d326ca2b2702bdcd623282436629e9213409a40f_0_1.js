function on_request(req, res) {
    LOG.info('Request: %j %j', req.url, req.headers)

    request_id += 1
    requests[request_id] = { 'req': req
                           , 'res':res
                           , 'stdout': []
                           , 'stderr': []
                           }

    req.url = URL.parse(req.url)
    var cgi = { 'PATH_INFO': req.url.pathname
              , 'SERVER_NAME': server_addr || 'unknown'
              , 'SERVER_PORT': port
              , 'SERVER_PROTOCOL': 'HTTP/1.1'
              , 'SERVER_SOFTWARE': 'Node/' + process.version
              }

    Object.keys(req.headers).forEach(function(header) {
      var key = 'HTTP_' + header.toUpperCase().replace(/-/g, '_')
      cgi[key] = req.headers[header]
    })

    cgi.REQUEST_METHOD = req.method
    cgi.QUERY_STRING = req.url.query || ''
    if('content-length' in req.headers)
      cgi.CONTENT_LENGTH = req.headers['content-length']
    if('content-type' in req.headers)
      cgi.CONTENT_LENGTH = req.headers['content-type']
    if('authorization' in req.headers)
      cgi.AUTH_TYPE = req.headers.authorization.split(/ /)[0]

    //LOG.info('CGI: %j', cgi)

    var params = []
    Object.keys(cgi).forEach(function(key) {
      params.push([key, cgi[key]])
    })

    // Write the request to FastCGI.
    var writer = new FCGI.writer
    writer.encoding = 'binary'

    // Begin
    writer.writeHeader({ 'version' : FCGI.constants.version
                       , 'type'    : FCGI.constants.record.FCGI_BEGIN
                       , 'recordId': request_id
                       , 'contentLength': 8
                       , 'paddingLength': 0
                       })
    writer.writeBegin({ 'role': FCGI.constants.role.FCGI_RESPONDER
                      , 'flags': FCGI.constants.keepalive.OFF
                      })
    socket.write(writer.tobuffer())

    // Parameters
    writer.writeHeader({ 'version' : FCGI.constants.version
                       , 'type'    : FCGI.constants.record.FCGI_PARAMS
                       , 'recordId': request_id
                       , 'contentLength': FCGI.getParamLength(params)
                       , 'paddingLength': 0
                       })
    writer.writeParams(params)
    socket.write(writer.tobuffer())

    // End parameters
    writer.writeHeader({ 'version' : FCGI.constants.version
                       , 'type'    : FCGI.constants.record.FCGI_PARAMS
                       , 'recordId': request_id
                       , 'contentLength': 0
                       , 'paddingLength': 0
                       })
    socket.write(writer.tobuffer())

    // STDIN
    writer.writeHeader({ 'version' : FCGI.constants.version
                       , 'type'    : FCGI.constants.record.FCGI_STDIN
                       , 'recordId': request_id
                       , 'contentLength': 0
                       , 'paddingLength': 0
                       })
    socket.write(writer.tobuffer())
  }