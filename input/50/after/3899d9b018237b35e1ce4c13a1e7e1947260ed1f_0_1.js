function(command, options){
		var commands = {};
		commands[command] = options || null;
		return commands;
	}