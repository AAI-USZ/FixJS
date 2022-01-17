function(er, values) {
      if(er)
        return callback(er)

      values.FCGI_MPXS_CONNS = values.FCGI_MPXS_CONNS || 0
      LOG.info('FCGI values: %j', values)

      var server = http.createServer(fcgi_handler(port, host, values, socket, socket_path))
      server.listen(port, host)
      return callback(null)
    }