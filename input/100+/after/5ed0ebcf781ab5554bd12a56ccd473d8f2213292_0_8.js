function() {
				var elem = $(this);
				if(elem.attr('id') === ('chat-room-' + roomId)) {
					elem.show();
					Candy.View.getCurrent().roomJid = roomJid;
					self.Chat.updateToolbar(roomJid);
					self.Chat.setActiveTab(roomJid);
					self.Chat.clearUnreadMessages(roomJid);
					self.Room.setFocusToForm(roomJid);
					self.Room.scrollToBottom(roomJid);

					var evtData = {'roomJid': roomJid, 'element' : elem};

					Candy.View.Event.Room.onShow(evtData);

					/* new event system call */
					$(Candy.View.Pane.Room).triggerHandler('show', [evtData]);

				} else {
					elem.hide();

					var evtData = {'roomJid': roomJid, 'element' : elem};
					Candy.View.Event.Room.onHide(evtData);

					/* new event system call */
					$(Candy.View.Pane.Room).triggerHandler('hide', [evtData]);
				}
			}