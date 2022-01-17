function(jidOrHost, password, nick) {
		// Reset before every connection attempt to make sure reconnections work after authfail, alltabsclosed, ...
		_connection.reset();
		self.registerEventHandlers();

		_anonymousConnection = !_anonymousConnection ? jidOrHost && jidOrHost.indexOf("@") < 0 : true;

		if(jidOrHost && password) {
			// authentication
			_connection.connect(_getEscapedJidFromJid(jidOrHost) + '/' + Candy.about.name, password, Candy.Core.Event.Strophe.Connect);
			if (nick) {
				_user = new self.ChatUser(jidOrHost, nick);
			} else {
				_user = new self.ChatUser(jidOrHost, Strophe.getNodeFromJid(jidOrHost));
			}
		} else if(jidOrHost && nick) {
			// anonymous connect
			_connection.connect(_getEscapedJidFromJid(jidOrHost) + '/' + Candy.about.name, null, Candy.Core.Event.Strophe.Connect);
			_user = new self.ChatUser(null, nick); // set jid to null because we'll later receive it
		} else if(jidOrHost) {
			Candy.Core.Event.Login(jidOrHost);
		} else {
			// display login modal
			Candy.Core.Event.Login();
		}
	}