function(roomJid, roomName, roomType) {
			roomType = roomType || 'groupchat';
			// First room, show sound control
			if(Candy.Util.isEmptyObject(self.Chat.rooms)) {
				self.Chat.Toolbar.show();
			}

			var roomId = Candy.Util.jidToId(roomJid);
			self.Chat.rooms[roomJid] = {id: roomId, usercount: 0, name: roomName, type: roomType, messageCount: 0, scrollPosition: -1};

			$('#chat-rooms').append(Mustache.to_html(Candy.View.Template.Room.pane, {
				roomId: roomId,
				roomJid: roomJid,
				roomType: roomType,
				form: {
					_messageSubmit: $.i18n._('messageSubmit')
				},
				roster: {
					_userOnline: $.i18n._('userOnline')
				}
			}, {
				roster: Candy.View.Template.Roster.pane,
				messages: Candy.View.Template.Message.pane,
				form: Candy.View.Template.Room.form
			}));
			self.Chat.addTab(roomJid, roomName, roomType);
			self.Room.getPane(roomJid, '.message-form').submit(self.Message.submit);

			var evtData = {'roomJid': roomJid, 'type': roomType, 'element': self.Room.getPane(roomJid)};

			Candy.View.Event.Room.onAdd(evtData);

			/* new event system call */
			$(Candy.View.Pane.Room).triggerHandler('add', [evtData]);

			return roomId;
		}