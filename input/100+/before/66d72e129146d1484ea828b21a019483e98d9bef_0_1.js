function() {
			Candy.Core.Event.addObserver(Candy.Core.Event.KEYS.CHAT, self.Observer.Chat);
			Candy.Core.Event.addObserver(Candy.Core.Event.KEYS.PRESENCE, self.Observer.Presence);
			Candy.Core.Event.addObserver(Candy.Core.Event.KEYS.PRESENCE_ERROR, self.Observer.PresenceError);
			Candy.Core.Event.addObserver(Candy.Core.Event.KEYS.MESSAGE, self.Observer.Message);
			Candy.Core.Event.addObserver(Candy.Core.Event.KEYS.LOGIN, self.Observer.Login);
		}