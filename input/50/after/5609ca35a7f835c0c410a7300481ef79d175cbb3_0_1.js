function console_disconnect() {
	/*if (Client.roster.length > 0) {
    	for (i = 0; i < Client.roster.length; ++i) {
		    console.log("will send unavailable to " + Client.roster[i]);
			Client.connection.send($pres({
				to: Client.roster[i],
				"type": "unavailable"}));
		}
	}*/ 
	Client.connection.disconnect();
	return false;
}