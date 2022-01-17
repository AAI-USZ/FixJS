function handleRosterMini(iq) {
	// Added to sort buddies by name
    var buddies = [];
    var i = 0;
	
	// Parse the roster
	jQuery(iq.getQuery()).find('item').each(function() {
		// Get the values
		var current = jQuery(this);
		var xid = current.attr('jid');
		var subscription = current.attr('subscription');
		
		// Not a gateway
		if(!isGateway(xid)) {
			var nick = current.attr('name');
			var hash = hex_md5(xid);
			
			// Multidimentional array
			buddies[i] = [];
			
			// No name is defined?
			if(!nick)
				nick = getXIDNick(xid);
			
			// Populate buddy array
            buddies[i][0] = nick;
            buddies[i][1] = hash;
            buddies[i][2] = xid;
            buddies[i][3] = subscription;
		}
		
		// Increment counter
		i++;
	});
	
    // Sort array and loop reverse
    var buddies = buddies.sort();
    var x = buddies.length;
    var nick, hash, xid, subscription;
    
    for (var i=0;i<x; i++) {
        nick = buddies[i][0];
        hash = buddies[i][1];
        xid = buddies[i][2];
        subscription = buddies[i][3];
    	
    	if(subscription == 'remove')
			removeBuddyMini(hash);
    	else
			addBuddyMini(xid, hash, nick, null, subscription);
    }
    
	// Not yet initialized
	if(!MINI_INITIALIZED)
		initializeMini();
	
	logThis('Roster got.', 3);
}