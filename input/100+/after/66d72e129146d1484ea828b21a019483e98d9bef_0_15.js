function(roomJid, roomName, switchToRoom, isNoConferenceRoomJid) {
			var user = isNoConferenceRoomJid ? Candy.Core.getUser() : self.Room.getUser(Strophe.getBareJidFromJid(roomJid));
			// if target user is in privacy list, don't open the private chat.
			if (Candy.Core.getUser().isInPrivacyList('ignore', roomJid)) {
				return false;
			}
			if(!self.Chat.rooms[roomJid]) {
				self.Room.init(roomJid, roomName, 'chat');
			}
			if(switchToRoom) {
				self.Room.show(roomJid);
			}
			
			self.Roster.update(roomJid, new Candy.Core.ChatUser(roomJid, roomName), 'join', user);
			self.Roster.update(roomJid, user, 'join', user);
			self.PrivateRoom.setStatus(roomJid, 'join');
			
			
			
			// We can't track the presence of a user if it's not a conference jid
			if(isNoConferenceRoomJid) {
				self.Chat.infoMessage(roomJid, $.i18n._('presenceUnknownWarningSubject'), $.i18n._('presenceUnknownWarning'));
			}

			var evtData = {'roomJid': roomJid, type: 'chat', 'element': self.Room.getPane(roomJid)};

			// deprecated
			Candy.View.Event.Room.onAdd(evtData);

			/* new event system call */
			$(self).triggerHandler('candy:view.room.afterAdd', evtData);
		}