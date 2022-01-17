function (object, src, channel, command) {
		validcommand = true;
		if (global[object].commands[command[0].toLowerCase()] != undefined) {
			command[0] += "*" + command[1];
			command.splice(1, 1);
		}
		command = command.join(' ').split('*');
		if (global[object].commands[command[0].toLowerCase()] === undefined) {
			validcommand = false;
			return;
		}
		global[object].commands[command[0].toLowerCase()](src, channel, command);
		commandused = true;
	}