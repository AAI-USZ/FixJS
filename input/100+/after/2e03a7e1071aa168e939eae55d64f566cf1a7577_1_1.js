function(src, message, channel){
		/* Command Execution */
		if (message[0] == "/" && message.length > 1){
			sys.stopEvent();
			var command = message.substr(1, message.length).split(' '), index;
			commandused = false;
			commandtry("global", src, channel, command);
			for (index in construction.units){
				commandtry(construction.units[index], src, channel, command);
			}
			if (!validcommand && !commandused){
				commanderror(src, "The server does not recognise <b>\"" + escapehtml(message) + "\"</b> as a valid command.", channel);
			}
		}
	}