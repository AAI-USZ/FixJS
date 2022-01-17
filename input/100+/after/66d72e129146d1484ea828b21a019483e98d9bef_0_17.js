function(event) {
			var roomType = Candy.View.Pane.Chat.rooms[Candy.View.getCurrent().roomJid].type,
				message = $(this).children('.field').val().substring(0, Candy.View.getOptions().crop.message.body);

			// deprecated
			message = Candy.View.Event.Message.beforeSend(message);

			/* new event system call */
			var evtData = {message: message};
			$(self).triggerHandler('candy:view.message.beforeSend', evtData);
			message = evtData.message;

			Candy.Core.Action.Jabber.Room.Message(Candy.View.getCurrent().roomJid, message, roomType);
			// Private user chat. Jabber won't notify the user who has sent the message. Just show it as the user hits the button...
			if(roomType === 'chat' && message) {
				self.Message.show(Candy.View.getCurrent().roomJid, self.Room.getUser(Candy.View.getCurrent().roomJid).getNick(), message);
			}
			// Clear input and set focus to it
			$(this).children('.field').val('').focus();
			event.preventDefault();
		}