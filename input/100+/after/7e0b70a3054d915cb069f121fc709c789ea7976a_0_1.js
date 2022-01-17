function disconnect () {
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
	}