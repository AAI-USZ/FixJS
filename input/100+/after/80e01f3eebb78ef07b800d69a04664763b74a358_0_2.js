function(data, callback) {
			if (!data.headers.cookie)
				return callback('No cookie', false);

			//data est ce qui sera exposé dans socket.handshake.session
			var cookie = nodeCookie.parse(data.headers.cookie);
			var signedCookie = utils.parseSignedCookies(cookie, cookieSecret);

			data.sessionID = signedCookie[sessionKey];
			
			if (!data.sessionID)
				return callback('SIDs don\'t match', false);
			
			data.sessionStore = sessionStore;

			sessionStore.load(data.sessionID, function(err, session) {
				if (err || !session)
					return callback('Error loading session', false);

				data.session = session;
				callback(null, true);
			});
		}