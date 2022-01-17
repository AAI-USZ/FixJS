function (data) {
  console.log("we have a connect!");
  socket.emit('init', { fbid: lambdaracer.current.fbid });
}