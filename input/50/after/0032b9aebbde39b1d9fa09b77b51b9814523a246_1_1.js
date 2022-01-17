function(data){
      self.die();
      console.log('Player with this session Id,' + _.pluck(io.sockets, 'sessionid') + ', has died.');
      // send this die screen only to the client with died Icarus
    }