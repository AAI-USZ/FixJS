function(devices, except) {
 	var prefix = except ? '!>' : '';
 	if (devices.length === 0) { 
 		devices[0]='00:00:00:00:00:00'; //Makes sure that rules in empty groups don't apply to all devices
 	}
	return prefix + devices.join('>');
}