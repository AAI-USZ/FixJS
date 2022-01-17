function(elem, roomJid, user) {
				elem = $(elem);
				var roomId = self.Chat.rooms[roomJid].id,
					menu = $('#context-menu'),
					links = $('ul li', menu);

				$('#tooltip').hide();

				// add specific context-user class if a user is available (when context menu should be opened next to a user)
				if(!user) {
					user = Candy.Core.getUser();
				}

				links.remove();

				var menulinks = this.getMenuLinks(roomJid, user, elem),
					id,
					clickHandler = function(roomJid, user) {
						return function(event) {
							event.data.callback(event, roomJid, user);
							$('#context-menu').hide();
						};
					};

				for(id in menulinks) {
					if(menulinks.hasOwnProperty(id)) {
						var link = menulinks[id],
							html = Mustache.to_html(Candy.View.Template.Chat.Context.menulinks, {
								'roomId'   : roomId,
								'class'    : link['class'],
								'id'       : id,
								'label'    : link.label
							});
						$('ul', menu).append(html);
						$('#context-menu-' + id).bind('click', link, clickHandler(roomJid, user));
					}
				}
				// if `id` is set the menu is not empty
				if(id) {
					var pos = elem.offset(),
						posLeft = Candy.Util.getPosLeftAccordingToWindowBounds(menu, pos.left),
						posTop  = Candy.Util.getPosTopAccordingToWindowBounds(menu, pos.top);

					menu.css({'left': posLeft.px, 'top': posTop.px, backgroundPosition: posLeft.backgroundPositionAlignment + ' ' + posTop.backgroundPositionAlignment});
					menu.fadeIn('fast');

					Candy.View.Event.Roster.afterContextMenu({'roomJid' : roomJid, 'user' : user, 'element': menu });

					return true;
				}
			}