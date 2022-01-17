function(roomJid, user, elem) {
				var menulinks = $.extend(this.initialMenuLinks(elem), Candy.View.Event.Roster.onContextMenu({'roomJid' : roomJid, 'user' : user, 'elem': elem })),
					id;

				for(id in menulinks) {
					if(menulinks.hasOwnProperty(id) && menulinks[id].requiredPermission !== undefined && !menulinks[id].requiredPermission(user, self.Room.getUser(roomJid), elem)) {
						delete menulinks[id];
					}
				}
				return menulinks;
			}