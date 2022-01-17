function(socket) {
	    logger.trace((new Date()) + " Connection accepted.");

	    socket.on('message', function(message) {
			msg = JSON.parse(message);
			logger.trace('calling rpc with message(' +  msg + ')');
			logger.trace('message.method=' + msg.method);
	        rpcHandler.handleMessage(msg, this, Math.round(Math.random() * 10000));
			logger.trace('rpc called.');
	    });
		
		socket.on('disconnect', function () {
	    	logger.debug('user disconnected');
	  	});

		//RPC writer for this connection
		var messageHandler = {
    		write: function(result, respto, msgid)	{
    			logger.trace('result(' + result + ')');
    			socket.send(JSON.stringify(result));
    			logger.trace('end result();')
    		}
		}
		
		rpcHandler.setMessageHandler(messageHandler);
	}