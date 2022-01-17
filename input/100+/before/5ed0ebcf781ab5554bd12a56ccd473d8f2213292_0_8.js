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

					Candy.View.Event.Room.onShow({'roomJid': roomJid, 'element' : elem});
				} else {
					elem.hide();

					Candy.View.Event.Room.onHide({'roomJid': roomJid, 'element' : elem});
				}
			}