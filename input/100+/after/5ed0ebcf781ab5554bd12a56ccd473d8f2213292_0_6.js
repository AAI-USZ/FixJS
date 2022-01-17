function(roomJid, user, elem) {
				var menulinks, extramenulinks, id;

				var evtData = {'roomJid' : roomJid, 'user' : user, 'elem': elem};
				extramenulinks = Candy.View.Event.Roster.onContextMenu(evtData);
				evtData.menulinks = $.extend(this.initialMenuLinks(elem), extramenulinks);

				/* new event system call, here handlers will modify evtData.menulinks */
				$(Candy.View.Pane.Chat.Context).triggerHandler('contextmenu', [evtData]);

				menulinks = evtData.menulinks;

				for(id in menulinks) {
					if(menulinks.hasOwnProperty(id) && menulinks[id].requiredPermission !== undefined && !menulinks[id].requiredPermission(user, self.Room.getUser(roomJid), elem)) {
						delete menulinks[id];
					}
				}
				return menulinks;
			}