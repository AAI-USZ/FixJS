function(msg) {
				Candy.Core.log('[Jabber:Room] Presence Error');
				var from = Candy.Util.unescapeJid(msg.attr('from')),
					roomJid = Strophe.getBareJidFromJid(from),
					room = Candy.Core.getRooms()[roomJid],
					roomName = room.getName();
					
				// Presence error: Remove room from array to prevent error when disconnecting
				delete room;
				
				self.notifyObservers(self.KEYS.PRESENCE_ERROR, {'msg' : msg, 'type': msg.children('error').children()[0].tagName.toLowerCase(), 'roomJid': roomJid, 'roomName': roomName});
			}