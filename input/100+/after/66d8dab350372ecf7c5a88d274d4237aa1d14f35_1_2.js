function (presence) {
		var ptype = jQuery(presence).attr('type');
		var from = jQuery(presence).attr('from');
		var from_bare = Strophe.getBareJidFromJid(from);
		var to_bare = Strophe.getBareJidFromJid(jQuery(presence).attr('to'));
		//console.log('from: ' + from + '  to: ' + jQuery(presence).attr('to') + '  ptype: ' + ptype + '  show: ' + jQuery(presence).find("show").text());
		
		if (Client.my_full_jid == '') {
			Client.my_full_jid = jQuery(presence).attr('to');
			Client.connection.send($pres().c('show').t(Client.my_full_jid));
		}
		
		// do nothing if received data is not from course members
		if (Client.check_membership(from_bare) == false) {
			console.log("presence from non-member: " + from_bare);
			return true;
		}

		if (ptype !== 'error' && from_bare != to_bare) {
			var contact = document.getElementById(from_bare);
			if (jQuery(presence).find("show").text() == from) {
				jQuery("div").filter(contact).data('full_jid', from);
				//console.log('!!! put ' + from);
			}
			
			if (ptype === 'unavailable' && jQuery("div").filter(contact).data('full_jid') == from) {
				// ATutor chat user
				//console.log(from_bare + ' unavailable from ATutor chat');
				online = false;
			} else if (ptype === 'unavailable' && jQuery("div").filter(contact).data('full_jid') == undefined) {
				// other client user
				//console.log(from_bare + ' unavailable from other client');
				online = false;
			} else {
				var show = jQuery(presence).find("show").text();
				if (show === "" || show === "chat") {
					//console.log(from_bare + ' online');
					online = true;
				} else {
					//console.log(from_bare + ' away');
					online = true;
				}
			}			
			Client.replace_contact(contact, online);	
		}

		// reset addressing for user since their presence changed
		var jid_id = Client.jid_to_id(from);
		jQuery('#chat_' + jid_id).data('jid', Strophe.getBareJidFromJid(from));
		
		return true;
	}