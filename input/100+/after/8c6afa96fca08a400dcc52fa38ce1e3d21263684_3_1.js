function (app_or_port) {
  io = io.listen(app_or_port, config.socket.options);

  var controller_files = file_helper.getFiles(__dirname, '/socket_controllers/');
  
  controller_files.forEach(function (val) {
    var name = val.match(/^\/socket_controllers\/([\w]*)SocketChannel.js$/)[1];
    var connectionHandler = require('.'+val).connectionHandler;
    if ("function" === typeof (connectionHandler) ) {
      channels[name] = io
        .of('/'+name)
        .on('connection', connectionHandler);
    } else {
      console.log('Warning: Found socket controller without connection Handler export.');
    }
  });
  
  return io;
}