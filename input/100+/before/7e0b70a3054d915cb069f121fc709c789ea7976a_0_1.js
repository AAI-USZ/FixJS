function disconnect () {
		//console.log('client disconnected ' + socket.id);
		if (sockets[socket.id]) {
			if (sockets[socket.id].tokenId) {
				delete tokens[sockets[socket.id].tokenId];
			}
			delete sockets[socket.id];
		}
	}