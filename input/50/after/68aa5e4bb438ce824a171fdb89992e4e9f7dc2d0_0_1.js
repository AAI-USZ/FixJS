function() {
    if(done) return;
    res.send(200);
    if(pending === 0) {
      socket.emit("done");
    }
  }