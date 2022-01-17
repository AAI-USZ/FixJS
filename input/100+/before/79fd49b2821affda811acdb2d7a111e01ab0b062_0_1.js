function (presence) {
		var ptype = jQuery(presence).attr('type');
		var from = jQuery(presence).attr('from');
		var from_bare = Strophe.getBareJidFromJid(from);
		// var jid_id = Client.jid_to_id(from);
		
		// do nothing if received data is not from course members
		if (Client.check_membership(from_bare) == false) {
			console.log("presence from non-member: " + from_bare);
			return;
		}

		if (ptype === 'subscribe') {
			// populate pending_subscriber, the approve-jid span, and open the dialog
			Client.pending_subscriber = from;
			jQuery('#approve-jid').text(Strophe.getBareJidFromJid(from));
			jQuery('#approve_dialog').dialog('open');
		} else if (ptype !== 'error') {
			var contact = document.getElementById(from_bare);
			if (ptype === 'unavailable') {
				// console.log(from + ' unavailable');
				online = false;
			} else {
				var show = jQuery(presence).find("show").text();
				if (show === "" || show === "chat") {
					// console.log(from + ' online');
					online = true;
				} else {
					// console.log(from + ' away');
					online = true;
				}
			}
			Client.replace_contact(contact, online);
		}
		// reset addressing for user since their presence changed
		// var jid_id = Client.jid_to_id(from);
		// jQuery('#chat-' + jid_id).data('jid', Strophe.getBareJidFromJid(from));
		// return true;
	}