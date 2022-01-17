function(event, args) {
			// Client left
			if(args.type === 'leave') {
				var user = Candy.View.Pane.Room.getUser(args.roomJid);
				Candy.View.Pane.Room.close(args.roomJid);
				self.Presence.notifyPrivateChats(user, args.type);
			// Client has been kicked or banned
			} else if (args.type === 'kick' || args.type === 'ban') {
				var actorName = args.actor ? Strophe.getNodeFromJid(args.actor) : null,
					actionLabel,
					translationParams = [args.roomName];

				if (actorName) {
					translationParams.push(actorName);
				}

				switch(args.type) {
					case 'kick':
						actionLabel = $.i18n._((actorName ? 'youHaveBeenKickedBy' : 'youHaveBeenKicked'), translationParams);
						break;
					case 'ban':
						actionLabel = $.i18n._((actorName ? 'youHaveBeenBannedBy' : 'youHaveBeenBanned'), translationParams);
						break;
				}
				Candy.View.Pane.Chat.Modal.show(Mustache.to_html(Candy.View.Template.Chat.Context.adminMessageReason, {
					reason: args.reason,
					_action: actionLabel,
					_reason: $.i18n._('reasonWas', [args.reason])
				}));
				setTimeout(function() {
					Candy.View.Pane.Chat.Modal.hide(function() {
						Candy.View.Pane.Room.close(args.roomJid);
						self.Presence.notifyPrivateChats(args.user, args.type);
					});
				}, 5000);

				var evtData = { type: args.type, reason: args.reason, roomJid: args.roomJid, user: args.user };
				Candy.View.Event.Room.onPresenceChange(evtData);

				/* new event system call */
				$(Candy.View.Observer.Chat).triggerHandler('presencechange', [evtData]);

			// A user changed presence
			} else {
				// Initialize room if not yet existing
				if(!Candy.View.Pane.Chat.rooms[args.roomJid]) {
					Candy.View.Pane.Room.init(args.roomJid, args.roomName);
					Candy.View.Pane.Room.show(args.roomJid);
				}
				Candy.View.Pane.Roster.update(args.roomJid, args.user, args.action, args.currentUser);
				// Notify private user chats if existing
				if(Candy.View.Pane.Chat.rooms[args.user.getJid()]) {
					Candy.View.Pane.Roster.update(args.user.getJid(), args.user, args.action, args.currentUser);
					Candy.View.Pane.PrivateRoom.setStatus(args.user.getJid(), args.action);
				}
			}
		}