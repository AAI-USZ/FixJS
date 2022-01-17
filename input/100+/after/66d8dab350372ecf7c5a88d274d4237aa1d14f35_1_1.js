function (presence) {
		var from = jQuery(presence).attr('from');
		var from_bare = Strophe.getBareJidFromJid(from);
		
		// do nothing if received data is not from course members
		if (Client.check_membership(from_bare) == false) {
			console.log("presence subscribed from non-member: " + from_bare);
			return;
		}
		
			console.log('subscribed - ' + from);
			if (jQuery.inArray(from_bare, Client.subscribe) > -1 && jQuery.inArray(from_bare, Client.subscribed) == -1) {
				// he initiated, finishing subscription
				Client.connection.send($pres({
					to: from,
					"type": "subscribe"}));
				Client.subscribed.push(from_bare);
				
			} else if (jQuery.inArray(from_bare, Client.subscribe) == -1 && jQuery.inArray(from_bare, Client.subscribed) == -1) {
				// i initiated
				Client.subscribed.push(from_bare);
			}
			
			if (jQuery.inArray(from_bare, Client.subscribe) > -1 && jQuery.inArray(from_bare, Client.subscribed) > -1) {
				// remove
				removeItem = from_bare;
				Client.subscribe = jQuery.grep(Client.subscribe, function(value) {
					return value != removeItem;
				});
				Client.subscribed = jQuery.grep(Client.subscribed, function(value) {
					return value != removeItem;
				});
				
				Client.roster.push(from_bare);
				console.log("just added- " + Client.roster);
			}
			
			console.log("Client.subscribed- " + Client.subscribed + "; Client.subscribe-" + Client.subscribe);
	}