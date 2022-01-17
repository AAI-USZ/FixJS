function on_record(record) {
    var parser = this

    LOG.info('Record %s for %s', record.header.type, record.header.recordId)

    record.bodies = parser.bodies
    parser.bodies = null
    record.body_utf8 = function() {
      return (this.bodies || [])
                 .map(function(data) { return data.toString() })
                 .join('')
    }

    var req_id = record.header.recordId
    if(req_id == 0)
      return LOG.info('Ignoring management record: %j', record)

    var request = requests_in_flight[req_id]
    if(!request)
      return LOG.error('Record for unknown request: %s\n%s', req_id, util.inspect(request))

    if(record.header.type == FCGI.constants.record.FCGI_STDERR)
      return LOG.error('Error: %s', record.body_utf8().trim())

    else if(record.header.type == FCGI.constants.record.FCGI_STDOUT) {
      if(!record.bodies)
        return

      request.stdout = request.stdout.concat(record.bodies)
      return send_stdout(request)
    }

    else if(record.header.type == FCGI.constants.record.FCGI_END) {
      request.res.end()
      LOG.info('%s %s %d', request.req.method, request.req.url, request.status)
      delete requests_in_flight[req_id]

      if(request.keepalive == FCGI.constants.keepalive.ON)
        process_request() // If there are more in the queue, get to them now.
      else
        socket.end()
    }

    else {
      LOG.info('Unknown record: %j', record)
      Object.keys(FCGI.constants.record).forEach(function(type) {
        if(record.header.type == FCGI.constants.record[type])
          LOG.info('Unknown record type: %s', type)
      })
    }
  }