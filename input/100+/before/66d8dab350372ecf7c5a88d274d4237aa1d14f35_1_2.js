function (presence) {
		var ptype = jQuery(presence).attr('type');
		var from = jQuery(presence).attr('from');
		var from_bare = Strophe.getBareJidFromJid(from);
		var to_bare = Strophe.getBareJidFromJid(jQuery(presence).attr('to'));
		
		// do nothing if received data is not from course members
		if (Client.check_membership(from_bare) == false) {
			console.log("presence from non-member: " + from_bare);
			return;
		}

		if (ptype !== 'error' && from_bare != to_bare) {
			var contact = document.getElementById(from_bare);
			if (ptype === 'unavailable') {
				console.log(from_bare + ' unavailable');
				online = false;
			} else {
				var show = jQuery(presence).find("show").text();
				if (show === "" || show === "chat") {
					console.log(from_bare + ' online');
					online = true;
				} else {
					console.log(from_bare + ' away');
					online = true;
				}
			}			
			Client.replace_contact(contact, online);	
		}

		return true;
	}