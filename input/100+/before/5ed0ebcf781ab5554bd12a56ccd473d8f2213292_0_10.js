function(roomJid) {
			self.Chat.removeTab(roomJid);
			self.Window.clearUnreadMessages();

			/* TODO:
				There's a rendering bug in Opera which doesn't redraw (remove) the message form.
				Only a cosmetical issue (when all tabs are closed) but it's annoying...
				This happens when form has no focus too. Maybe it's because of CSS positioning.
			*/
			self.Room.getPane(roomJid).remove();
			var openRooms = $('#chat-rooms').children();
			if(Candy.View.getCurrent().roomJid === roomJid) {
				Candy.View.getCurrent().roomJid = null;
				if(openRooms.length === 0) {
					self.Chat.allTabsClosed();
				} else {
					self.Room.show(openRooms.last().attr('data-roomjid'));
				}
			}
			delete self.Chat.rooms[roomJid];

			Candy.View.Event.Room.onClose({'roomJid' : roomJid});
		}