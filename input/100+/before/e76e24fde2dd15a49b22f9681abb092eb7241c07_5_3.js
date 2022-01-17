function (sessionId, conn, port) {
  // Fetch details about connected pzp"s
  // Information to be sent includes address, id and indication which is a newPZP joining
  var self = this;
  // Fetch details about connected pzp"s
  // Information to be sent includes address, id and indication which is a newPZP joining
  var otherPzp = [], status;
  for(var i in  self.connectedPzp) {
    if (self.connectedPzp.hasOwnProperty(i)) {
      // Special case for new pzp
      if (i === sessionId) {
        status = true;
      } else {
          status = false;
      }
      otherPzp.push({name: i, address:self.connectedPzp[i].address, port: port, newPzp: status});
    }
  }
  // Send message to all connected pzp"s about new pzp that has joined in
  for(var i in self.connectedPzp) {
    if (self.connectedPzp.hasOwnProperty(i)) {
      var msg = self.prepMsg(self.sessionId, i, "pzpUpdate", otherPzp);
      self.sendMessage(msg, i);
    }
  }
}