function (message, address, conn) {
  var buf, self = this;
  try {
    log(self.sessionId, 'INFO', '[PZH -'+ self.sessionId+'] Send to '+ address + ' Message '+JSON.stringify(message));
    buf = new Buffer('#'+JSON.stringify(message)+'#', 'utf8');    
    if (self.connectedPzh.hasOwnProperty(address)) {
      self.connectedPzh[address].socket.pause();
      self.connectedPzh[address].socket.write(buf);
      self.connectedPzh[address].socket.resume();
    } else if (self.connectedPzp.hasOwnProperty(address)) {
      self.connectedPzp[address].socket.pause();
      self.connectedPzp[address].socket.write(buf);
        self.connectedPzp[address].socket.resume();
    } else if( typeof conn !== "undefined" ) {
      conn.pause();
      conn.write(buf);
      conn.resume();
    } else {// It is similar to PZP connecting to PZH but instead it is PZH to PZH connection
      log(self.sessionId, "INFO", "[PZH -"+ self.sessionId+"] Client " + address + " is not connected");
    }
  } catch(err) {
    log(self.sessionId, "ERROR ","[PZH -"+ self.sessionId+"] Exception in sending packet " + err);
  }
}