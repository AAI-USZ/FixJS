function(roomJid, subject) {
			var html = Mustache.to_html(Candy.View.Template.Room.subject, {
				subject: subject,
				roomName: self.Chat.rooms[roomJid].name,
				_roomSubject: $.i18n._('roomSubject'),
				time: Candy.Util.localizedTime(new Date().toGMTString())
			});
			self.Room.appendToMessagePane(roomJid, html);
			self.Room.scrollToBottom(roomJid);

			Candy.View.Event.Room.onSubjectChange({'roomJid': roomJid, 'element' : self.Room.getPane(roomJid), 'subject' : subject});
		}