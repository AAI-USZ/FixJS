function (msg) {
        // first msg successful connection => reset reconnect interval
        self.connectInterval = 0
        if      (msg['delete'])     { self.emit('delete', msg); }
        else if (msg['limit'])      { self.emit('limit', msg);  }     
        else if (msg['scrub_geo'])  { self.emit('scrub_geo', msg); }
        else                        { self.emit('tweet', msg); }
      }