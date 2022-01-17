function (data) {
		if (tokenIdsToSockets[data.tokenId]) {
			var receiverSocket = tokenIdsToSockets[data.tokenId].receiver;
			var token = sockets[receiverSocket.id].token, receiver;
			if (token) {
				if (sockets[receiverSocket.id].peerSocket) {
					socket.emit('rcjs:supplyToken', { error: 'invalid token (already in use)' } );
				} else if (new Date().getTime() > token.timeStamp + TOKEN_TTL) {
					socket.emit('rcjs:supplyToken', { error: 'invalid token (expired)' } );
					delete tokenIdsToSockets[data.tokenId];
				} else {
					sockets[receiverSocket.id].peerSocket = socket;
					sockets[receiverSocket.id].socket.emit('rcjs:registerSender', { tokenId: data.tokenId } );
					sockets[socket.id].peerSocket = sockets[receiverSocket.id].socket;
				}
			} else {
			 	socket.emit('rcjs:supplyToken', { error: 'invalid token (unknown)' } );
			}
		}
	}