function (data) {
		uid = data.uid;
    socketid = data.socket_id;
    console.log('-> socket', socketid);
		createPopup(uid, socketid);
    updateLog('Connection established with phone.');
	}