function (data) {
  socket.emit('init', { fbid: lambdaracer.current.fbid });
}