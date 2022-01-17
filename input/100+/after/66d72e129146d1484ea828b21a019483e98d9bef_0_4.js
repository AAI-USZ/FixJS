function(msg) {
				Candy.Core.log('[Jabber:Room] Leave');
				var msg = $(msg),
					from = msg.attr('from'),
					roomJid = Strophe.getBareJidFromJid(from);

				// if room is not joined yet, ignore.
				if (!Candy.Core.getRoom(roomJid)) {
					return false;
				}

				var roomName = Candy.Core.getRoom(roomJid).getName(),
					item = msg.find('item'),
					type = 'leave',
					reason,
					actor;

				delete Candy.Core.getRooms()[roomJid];
				// if user gets kicked, role is none and there's a status code 307
				if(item.attr('role') === 'none') {
					if(msg.find('status').attr('code') === '307') {
						type = 'kick';
					} else if(msg.find('status').attr('code') === '301') {
						type = 'ban';
					}
					reason = item.find('reason').text();
					actor  = item.find('actor').attr('jid');
				}

				var user = new Candy.Core.ChatUser(from, Strophe.getResourceFromJid(from), item.attr('affiliation'), item.attr('role'));

				$(self).triggerHandler('candy:core.presence', { 'roomJid': roomJid, 'roomName': roomName, 'type': type, 'reason': reason, 'actor': actor, 'user': user } );
				return true;
			}