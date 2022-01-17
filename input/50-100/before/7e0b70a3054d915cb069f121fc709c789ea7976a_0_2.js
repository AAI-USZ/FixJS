function (data) {
		if (tokens[sockets[socket.id].tokenId]) {
			delete tokens[sockets[socket.id].tokenId];
		}
		var tokenId = createTokenId();
		sockets[socket.id].tokenId = tokenId;
		tokens[tokenId] = {
			timeStamp: new Date().getTime(),
			receiverId: socket.id
		};
		socket.emit('rcjs:token', { tokenId: tokenId } );
	}