function(devices, except) {
 	var prefix = except ? '!>' : '';
	return prefix + devices.join('>');
}