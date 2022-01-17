function on_request(req, res) {
    LOG.info('Request: %j', req.url)
    request_id += 1
    var fcgi_request = { 'id': request_id
                       , 'req': req
                       , 'res':res
                       , 'stdout': []
                       , 'stderr': []
                       , 'keepalive': FCGI.constants.keepalive.OFF
                       }
    pending_requests.push(fcgi_request)
    process_request()
  }