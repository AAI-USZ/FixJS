function() {
	var socket = io.connect(socket_url), im;

  im = impress();

	socket.on('welcome', function (data) {
		uid = data.uid;
    socketid = data.socket_id;
    console.log('-> socket', socketid);
		createPopup(uid, socketid);
    updateLog('Connection established with phone.');
	});

  socket.on('command', function(data) {
    if (data.command === 'next') {
      im.next();
      updateLog('Next Slide &raquo;');
    } else if(data.command === 'prev') {
      im.prev();
      updateLog('&laquo; Previous Slide');
    }
  });
}