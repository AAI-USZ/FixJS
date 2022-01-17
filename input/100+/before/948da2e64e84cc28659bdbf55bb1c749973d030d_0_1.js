function () {
    var addr = app.httpServer.address();
    console.log('blow server online at http://' + addr.address + ':' + addr.port);
  }