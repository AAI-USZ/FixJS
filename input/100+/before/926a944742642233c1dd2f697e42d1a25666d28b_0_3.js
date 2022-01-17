function(incoming) {
	var match = incoming.match (/^(?:(:[^\s]+) )?([^\s]+) (.+)$/);

	var msg, params = match[3].match (/(.*?) ?:(.*)/);
	if (params) {
		// Message segment
		msg = params[2];
		// Params before message
		params = params[1].split (" ");

	} else {
		params = match[3].split  (" ");
	}

	var prefix  = match[1];
	var command = match[2];

/*  // Convert the numeric commands to be actual number types
	var charcode = command.charCodeAt(0);
	if (charcode >= 48 && charcode <= 57 && command.length == 3) {
		command = parseInt (command, 10);
	}
*/

	return {prefix: prefix, command: command, params: params, message: msg};
}