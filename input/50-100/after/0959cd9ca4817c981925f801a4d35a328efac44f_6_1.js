function() {
      if(!current_user){
        // not logged in, drop this session
        connection.disconnect();
      } else {
        // keep the session alive, remove this socket, and clear unreads
        connection.removeSocket(socket);
        connection.clearUnreads();
        
        // set ourselves as away
        if (connection.sockets.length == 0)
          connection.client.send('AWAY', connection.away);
      }
    }