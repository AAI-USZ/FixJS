function(er, values) {
      if(er)
        return callback(er)

      LOG.info('FCGI values: %j', values)
      var server = http.createServer(fcgi_handler(port, host, socket, socket_path))
      server.listen(port, host)
      return callback(null)
    }