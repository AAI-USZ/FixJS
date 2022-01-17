function (data) {
		var token, receiver;
		if ( (token = tokens[data.tokenId]) ) {
			receiver = sockets[token.receiverId].socket;
			if (receiver.sender) {
				socket.emit('rcjs:supplyToken', { error: 'invalid token (already in use)' } );
			} else if (new Date().getTime() > token.timeStamp + TOKEN_TTL) {
				socket.emit('rcjs:supplyToken', { error: 'invalid token (expired)' } );
				delete tokens[data.tokenId];
			} else {
				token.senderId = socket.id;
				receiver.emit('rcjs:registerSender', { tokenId: data.tokenId } );
			}
		} else {
			socket.emit('rcjs:supplyToken', { error: 'invalid token (unknown)' } );
		}
	}