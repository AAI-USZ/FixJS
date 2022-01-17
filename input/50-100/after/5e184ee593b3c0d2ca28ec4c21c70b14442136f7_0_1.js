function(socket) {
  socket.write(getFlashPolicy() + '\0');
  socket.end();

  log('[' + socket.remoteAddress + '] Sent Flash Policy');

  socket.on('error', function (e) {
    log('Error in policy server: ' + e);
  });
}