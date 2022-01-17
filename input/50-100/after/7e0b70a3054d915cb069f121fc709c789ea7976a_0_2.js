function (data) {
		var tokenId = createTokenId();
		sockets[socket.id].token = {
			id: tokenId,
			timeStamp: new Date().getTime()
		};
		tokenIdsToSockets[tokenId] = {
			receiver: socket
		}
		socket.emit('rcjs:token', { tokenId: tokenId } );
	}