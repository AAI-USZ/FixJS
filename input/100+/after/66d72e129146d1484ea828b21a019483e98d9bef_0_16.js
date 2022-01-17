function(roomJid, user, action, currentUser) {
			var roomId = self.Chat.rooms[roomJid].id,
				userId = Candy.Util.jidToId(user.getJid()),
				usercountDiff = -1,
				userElem = $('#user-' + roomId + '-' + userId);
				
			var evtData = {'roomJid': roomJid, type: null, 'user': user};

			$(self).triggerHandler('candy:view.roster.beforeUpdate', {'roomJid' : roomJid, 'user' : user, 'action': action, 'element': userElem});

			// a user joined the room
			if(action === 'join') {
				usercountDiff = 1;
				var html = Mustache.to_html(Candy.View.Template.Roster.user, {
						roomId: roomId,
						userId : userId,
						userJid: user.getJid(),
						nick: user.getNick(),
						displayNick: Candy.Util.crop(user.getNick(), Candy.View.getOptions().crop.roster.nickname),
						role: user.getRole(),
						affiliation: user.getAffiliation(),
						me: currentUser !== undefined && user.getNick() === currentUser.getNick(),
						tooltipRole: $.i18n._('tooltipRole'),
						tooltipIgnored: $.i18n._('tooltipIgnored')
					});

				if(userElem.length < 1) {
					var userInserted = false,
						rosterPane = self.Room.getPane(roomJid, '.roster-pane');
					// there are already users in the roster
					if(rosterPane.children().length > 0) {
						// insert alphabetically
						var userSortCompare = user.getNick().toUpperCase();
						rosterPane.children().each(function() {
							var elem = $(this);
							if(elem.attr('data-nick').toUpperCase() > userSortCompare) {
								elem.before(html);
								userInserted = true;
								return false;
							}
							return true;
						});
					}
					// first user in roster
					if(!userInserted) {
						rosterPane.append(html);
					}

					self.Roster.joinAnimation('user-' + roomId + '-' + userId);
					// only show other users joining & don't show if there's no message in the room.
					if(currentUser !== undefined && user.getNick() !== currentUser.getNick() && self.Room.getUser(roomJid)) {
						// always show join message in private room, even if status messages have been disabled
						if (self.Chat.rooms[roomJid].type === 'chat') {
							self.Chat.onInfoMessage(roomJid, $.i18n._('userJoinedRoom', [user.getNick()]));
						} else {
							self.Chat.infoMessage(roomJid, $.i18n._('userJoinedRoom', [user.getNick()]));
						}
					}
				// user is in room but maybe the affiliation/role has changed
				} else {
					usercountDiff = 0;
					userElem.replaceWith(html);
					$('#user-' + roomId + '-' + userId).css({opacity: 1}).show();
				}

				// Presence of client
				if (currentUser !== undefined && currentUser.getNick() === user.getNick()) {
					self.Room.setUser(roomJid, user);
				// add click handler for private chat
				} else {
					$('#user-' + roomId + '-' + userId).click(self.Roster.userClick);
				}

				$('#user-' + roomId + '-' + userId + ' .context').click(function(e) {
					self.Chat.Context.show(e.currentTarget, roomJid, user);
					e.stopPropagation();
				});

				// check if current user is ignoring the user who has joined.
				if (currentUser !== undefined && currentUser.isInPrivacyList('ignore', user.getJid())) {
					Candy.View.Pane.Room.addIgnoreIcon(roomJid, user.getJid());
				}

			// a user left the room
			} else if(action === 'leave') {
				self.Roster.leaveAnimation('user-' + roomId + '-' + userId);
				// always show leave message in private room, even if status messages have been disabled
				if (self.Chat.rooms[roomJid].type === 'chat') {
					self.Chat.onInfoMessage(roomJid, $.i18n._('userLeftRoom', [user.getNick()]));
				} else {
					self.Chat.infoMessage(roomJid, $.i18n._('userLeftRoom', [user.getNick()]));
				}
			// user has been kicked
			} else if(action === 'kick') {
				self.Roster.leaveAnimation('user-' + roomId + '-' + userId);
				self.Chat.onInfoMessage(roomJid, $.i18n._('userHasBeenKickedFromRoom', [user.getNick()]));
			// user has been banned
			} else if(action === 'ban') {
				self.Roster.leaveAnimation('user-' + roomId + '-' + userId);
				self.Chat.onInfoMessage(roomJid, $.i18n._('userHasBeenBannedFromRoom', [user.getNick()]));
			}

			// Update user count
			Candy.View.Pane.Chat.rooms[roomJid].usercount += usercountDiff;

			if(roomJid === Candy.View.getCurrent().roomJid) {
				Candy.View.Pane.Chat.Toolbar.updateUsercount(Candy.View.Pane.Chat.rooms[roomJid].usercount);
			}

			var evtData = {'roomJid' : roomJid, 'user' : user, 'action': action, 'element': $('#user-' + roomId + '-' + userId)};

			// deprecated
			Candy.View.Event.Roster.onUpdate(evtData);

			/* new event system call */
			$(self).triggerHandler('candy:view.roster.afterUpdate', evtData);
		}