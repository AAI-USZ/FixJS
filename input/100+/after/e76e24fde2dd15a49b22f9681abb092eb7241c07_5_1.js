function (message, address, conn) {
  var self = this;

  var jsonString = JSON.stringify(message);
  var buf = new Buffer(4 + jsonString.length, 'utf8');
  buf.writeUInt32LE(jsonString.length, 0);
  buf.write(jsonString, 4);

  log(self.sessionId, 'INFO', '[PZH -'+ self.sessionId+'] Send to '+ address + ' Message ' + jsonString);
  
  try {
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
      log(self.sessionId, 'INFO', '[PZH -'+ self.sessionId+'] Client ' + address + ' is not connected');
    }
  } catch(err) {
    log(self.sessionId, 'ERROR', '[PZH -'+ self.sessionId+'] Exception in sending packet ' + err);
  }
}