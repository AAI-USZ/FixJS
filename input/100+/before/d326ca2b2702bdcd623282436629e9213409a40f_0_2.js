function on_record(record) {
    var parser = this

    record.bodies = parser.bodies
    parser.bodies = null
    record.body_utf8 = function() {
      return this.bodies
                 .map(function(data) { return data.toString() })
                 .join('')
    }

    var req_id = record.header.recordId
    if(req_id == 0)
      return LOG.info('Ignoring management record: %j', record)

    var request = requests[req_id]
    if(!request)
      throw new Error('Record for unknown request: ' + req_id) // TODO

    if(record.header.type == FCGI.constants.record.FCGI_STDERR)
      return LOG.error('Error: %s', record.body_utf8().trim())

    else if(record.header.type == FCGI.constants.record.FCGI_STDOUT) {
      if(!record.bodies)
        return

      request.stdout = request.stdout.concat(record.bodies)
      return send_stdout(request)
    }

    else if(record.header.type == FCGI.constants.record.FCGI_END) {
      return request.res.end()
    }

    else {
      LOG.info('Unknown record: %j', record)
      Object.keys(FCGI.constants.record).forEach(function(type) {
        if(record.header.type == FCGI.constants.record[type])
          LOG.info('Unknown record type: %s', type)
      })
    }
  }