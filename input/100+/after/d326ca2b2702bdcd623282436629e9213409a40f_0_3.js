function send_stdout(request) {
    if(!request.status) {
      // Still looking for the headers and status.
      // TODO: I believe there is a bug here, if the headers aren't completely defined in the first data chunk.
      // The problem is, I don't want to get a chunk that has utf8 headers, then two newlines, then binary body.
      var parts = request.stdout[0].toString().split(/\r?\n\r?\n/)
      if(parts.length < 2)
        return LOG.warn('No complete headers in first stdout chunk') // Still waiting for all headers to arrive.

      // Headers have arrived. Convert the first stdout chunk into a .writeHead() and do not explicitly .write() it.
      request.stdout = request.stdout.slice(1)
      var headers_section = parts[0]
      var lines = headers_section.split(/\r?\n/)
        , headers = {}

      lines.forEach(function(line) {
        var match = line.match(/^(.*?):\s(.*)$/)
          , key = match && match[1].toLowerCase()

        if(key == 'status')
          request.status = parseInt(match[2]) || 200
        else
          headers[key] = match[2]
      })

      delete headers['accept-encoding']
      request.res.writeHead(request.status, headers)
    }

    while(request.stdout.length > 0) {
      var data = request.stdout.shift()
      request.res.write(data)
    }
  }