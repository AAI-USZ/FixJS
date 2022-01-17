function writer(result, respto, msgid)	{
			logger.trace('result(' + result + ')');
			socket.send(JSON.stringify(result));
			logger.trace('end result();')
		}