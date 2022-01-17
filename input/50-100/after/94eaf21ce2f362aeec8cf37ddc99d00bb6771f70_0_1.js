function(roomJid, msg, type) {
				// Trim message
				msg = $.trim(msg);
				if(msg === '') {
					return false;
				}
				Candy.Core.getConnection().muc.message(Candy.Util.escapeJid(roomJid), null, msg, null, type);
				return true;
			}