function(msg) {
			Candy.Core.log('[Jabber] Message');
			var msg = $(msg),
				fromJid = msg.attr('from'),
				type = msg.attr('type'),
				toJid = msg.attr('to');
			// Room message
			if(fromJid !== Strophe.getDomainFromJid(fromJid) && (type === 'groupchat' || type === 'chat' || type === 'error')) {
				self.Jabber.Room.Message(msg);
			// Admin message
			} else if(!toJid && fromJid === Strophe.getDomainFromJid(fromJid)) {
				$(self).triggerHandler('candy:core.chat.message', { type: (type || 'message'), message: msg.children('body').text() });
			// Server Message
			} else if(toJid && fromJid === Strophe.getDomainFromJid(fromJid)) {
				$(self).triggerHandler('candy:core.chat.message', { type: (type || 'message'), subject: msg.children('subject').text(), message: msg.children('body').text() });
			}
			return true;
		}