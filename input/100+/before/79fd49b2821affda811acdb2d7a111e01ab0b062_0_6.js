function () {
	console.log("Connection established.");
	
    var iq = $iq({type: 'get'}).c('query', {xmlns: 'jabber:iq:roster'});
    Client.connection.sendIQ(iq, Client.on_roster);
    // Client.connection.addHandler(Client.on_roster_changed, "jabber:iq:roster", "iq", "set");
    // Client.connection.addHandler(Client.on_message, null, "message", "chat");
	
	jQuery('.button').removeAttr('disabled');
    jQuery('#input').removeClass('disabled').removeAttr('disabled');
	document.body.style.cursor = "auto";
}