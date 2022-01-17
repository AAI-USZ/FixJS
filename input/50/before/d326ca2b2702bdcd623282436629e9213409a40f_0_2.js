function(er, new_socket) {
      if(er)
        throw er // TODO

      LOG.info('Reconnected: %s', socket_path)
      socket = new_socket
      prep_socket()
    }