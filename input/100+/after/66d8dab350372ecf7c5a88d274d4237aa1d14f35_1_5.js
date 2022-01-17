function (event, course_members_jids) {
	console.log("Connection established.");	
	
    var iq_roster = $iq({type: 'get'}).c('query', {xmlns: 'jabber:iq:roster'});
    Client.connection.sendIQ(iq_roster, Client.on_roster);  
    
    // Client.connection.addHandler(Client.on_roster_changed, "jabber:iq:roster", "iq", "set");
    Client.connection.addHandler(Client.on_message, null, "message", "chat");
    
    // send subscription request to all course members (on first login course_members_jids.length > 0)
    if (course_members_jids.length > 0) {
    	for (i = 0; i < course_members_jids.length; ++i) {
		    console.log("will send to " + course_members_jids[i]);
			Client.connection.send($pres({
				to: course_members_jids[i],
				"type": "subscribe"}));
		}
	}    
	
	jQuery('#buttonbar').find('input').removeAttr('disabled');
    jQuery('#console_input').removeClass('disabled').removeAttr('disabled');
	document.body.style.cursor = "auto";
}