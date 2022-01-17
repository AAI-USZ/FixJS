function() {
		    $(Candy.Core.Event).on('candy:core.chat.connection', self.Observer.Chat.Connection);
		    $(Candy.Core.Event).on('candy:core.chat.message', self.Observer.Chat.Message);
		    $(Candy.Core.Event).on('candy:core.login', self.Observer.Login);
		    $(Candy.Core.Event).on('candy:core.presence', self.Observer.Presence.update);
		    $(Candy.Core.Event).on('candy:core.presence.error', self.Observer.PresenceError);
		    $(Candy.Core.Event).on('candy:core.message', self.Observer.Message);
		}