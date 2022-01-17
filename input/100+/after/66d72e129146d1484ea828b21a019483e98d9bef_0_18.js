function(roomJid, name, message, timestamp) {
			message = Candy.Util.Parser.all(message.substring(0, Candy.View.getOptions().crop.message.body));

			var evtData = {'roomJid': roomJid, 'nick': name, 'message': message};
			// deprecated
			evtData.message = Candy.View.Event.Message.beforeShow(evtData);

			/* new event system call */
			$(self).triggerHandler('candy:view.message.beforeShow', evtData);
			message = evtData.message;
			
			if(!message) {
				return;
			}
			
			var renderEvtData = {
				template: Candy.View.Template.Message.item,
				templateData: {
					name: name,
					displayName: Candy.Util.crop(name, Candy.View.getOptions().crop.message.nickname),
					message: message,
					time: Candy.Util.localizedTime(timestamp || new Date().toGMTString())
				}
			};
			
			$(self).triggerHandler('candy:view.message.beforeRender', renderEvtData);

			var html = Mustache.to_html(renderEvtData.template, renderEvtData.templateData);
			self.Room.appendToMessagePane(roomJid, html);
			var elem = self.Room.getPane(roomJid, '.message-pane').children().last();
			// click on username opens private chat
			elem.find('a.name').click(function(event) {
				event.preventDefault();
				// Check if user is online and not myself
				if(name !== self.Room.getUser(Candy.View.getCurrent().roomJid).getNick() && Candy.Core.getRoom(roomJid).getRoster().get(roomJid + '/' + name)) {
					Candy.View.Pane.PrivateRoom.open(roomJid + '/' + name, name, true);
				}
			});

			// Notify the user about a new private message
			if(Candy.View.getCurrent().roomJid !== roomJid || !self.Window.hasFocus()) {
				self.Chat.increaseUnreadMessages(roomJid);
				if(Candy.View.Pane.Chat.rooms[roomJid].type === 'chat' && !self.Window.hasFocus()) {
					self.Chat.Toolbar.playSound();
				}
			}
			if(Candy.View.getCurrent().roomJid === roomJid) {
				self.Room.scrollToBottom(roomJid);
			}

			var evtData = {'roomJid': roomJid, 'element': elem, 'nick': name, 'message': message};

			// deprecated
			Candy.View.Event.Message.onShow(evtData);

			/* new event system call */
			$(self).triggerHandler('candy:view.message.afterShow', evtData);
		}