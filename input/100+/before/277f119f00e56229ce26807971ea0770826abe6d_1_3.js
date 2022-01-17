function() {
	var socket = io.connect(socket_url);

	socket.on('welcome', function (data) {
		uid = data.uid;
    socketid = data.socket_id;
    console.log('-> socket', socketid);
		createPopup(uid, socketid);
	});

  socket.on('command', function(data) {
    console.log('command received', data, socket.id);
  });
}