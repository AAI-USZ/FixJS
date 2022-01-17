function(data, callback) {
			if (!data.headers.cookie)
				return callback('No cookie', false);

			//data est ce qui sera exposé dans socket.handshake.session
			var cookie = utils.parseCookie(data.headers.cookie);
			var sid = cookie[sessionKey].split('.')[0];
			var signedSid = utils.sign(sid, cookieSecret);

			if (signedSid !== cookie[sessionKey])
				return callback('SID don\'t match', false);

			data.sessionID = sid;
			data.sessionStore = sessionStore;

			sessionStore.load(data.sessionID, function(err, session) {
				if (err || !session)
					return callback('Error loading session', false);

				data.session = session;
				callback(null, true);
			});
		}