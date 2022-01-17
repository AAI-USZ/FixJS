function (socket) {
	logger.info('client connected ' + socket.id);

	sockets[socket.id] = {
		token: null,
		socket: socket,
		peerSocket: null
	}

	socket.on('disconnect', function disconnect () {
		logger.info('client disconnected ' + socket.id);
		if (sockets[socket.id]) {
			if (sockets[socket.id].token && tokenIdsToSockets[sockets[socket.id].token.id]) {
				logger.debug('delete token');
				delete tokenIdsToSockets[sockets[socket.id].tokenId];
			}
			if (sockets[socket.id].peerSocket) {
				logger.debug('notify peer of disconnect');
				sockets[socket.id].peerSocket.emit('rcjs:remoteDisconnect', {});
				sockets[sockets[socket.id].peerSocket.id].peerSocket = null;
			}
			delete sockets[socket.id];
		}
	});

	socket.on('rcjs:requestToken', function (data) {
		var tokenId = createTokenId();
		sockets[socket.id].token = {
			id: tokenId,
			timeStamp: new Date().getTime()
		};
		tokenIdsToSockets[tokenId] = {
			receiver: socket
		}
		socket.emit('rcjs:token', { tokenId: tokenId } );
	});

	// Request: from sender app to connect to receiver app using a valid tokenId. 
    // Response: on error sends rcjs:supplyToken message back to source, on success a 
    // rcjs:registerSender
	socket.on('rcjs:supplyToken', function (data) {
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
	});

	// Request: from sender app after successfully processing an rcjs:registerSender event. 
	// The key that is required for subsequent eventing from receiver to sender is created. 
	// The server sends a rcjs:startCapture event to the sender. 
	socket.on('rcjs:confirmRegistration', function (data) {
		var token = sockets[socket.id].token;
		if (token) {
			token.key = createKey();
			var sender = sockets[socket.id].peerSocket;
			sender.emit('rcjs:startCapture', { 
				tokenId: data.tokenId, 
				key: token.key, 
				events: data.events 
			});
		}
	});

	socket.on('rcjs:event', function (data) {
		if (tokenIdsToSockets[data.tokenId]) {
			var receiverSocket = tokenIdsToSockets[data.tokenId].receiver;
			if (sockets[receiverSocket.id]) {
				var token = sockets[receiverSocket.id].token;
				if (!token) {
				} else if (data.key == token.key) {
					receiverSocket.emit('rcjs:event', { type: data.type, event: data.event } );
				} else {
					socket.emit('rcjs:invalid', { error: 'invalid key' } );
				}
			}
		}
	});
}