function (iq) {
		jQuery(iq).find('item').each(function () {
			var jid = jQuery(this).attr('jid');
			if (jid != '[object object]') {
				Client.roster.push(jid);
			}
		});
		console.log('roster: ' + Client.roster);
		
		// set up presence handler and send initial presence
		Client.connection.addHandler(Client.on_presence, null, "presence");
		Client.connection.addHandler(Client.on_presence_subscribe, null, "presence", "subscribe");
		Client.connection.addHandler(Client.on_presence_subscribed, null, "presence", "subscribed");
		Client.connection.send($pres());
	}