function (src, channel, command) {
		if (sys.auth(src) < 1) {
			commanderror(src, "Sorry, you do not have permission to use the echo command (mod command).", channel);
			return;
		}
		var index, authgroup, authnames = [];
		for (index in auth.options) {
			var name = auth.options[index].name.toLowerCase();
			authnames.push(name);
			if (name === command[1].toLowerCase() || removespaces(name) === command[1].toLowerCase()) {
				authgroup = index;
			}
		}
		if (command[1] === "undefined") {
			commanderror(src, "Sorry, the echo command did not execute as no auth group argument was specified. The following are auth group arguments: " + String(authnames).replace(/,/gi, ", ") + ".<br/> E.G. \"/echo owner*hello\"", channel);
			return;
		}
		if (authgroup === undefined) {
			commanderror(src, "Sorry, the echo command did not execute as no valid auth group argument was specified. The following are auth group arguments: " + String(authnames).replace(/,/gi, ", ") + ".<br/> E.G. \"/echo owner*hello\"", channel);
			return;
		}
		sys.sendAll(sys.name(src) + ":");
		var channelid = sys.channelId(command[command.length - 1]);
		command.splice(0, 2);
		if (channelid !== undefined) {
			command.splice(command.length - 1, 1);
		}
		command = command.join("*");
		auth.echo(authgroup, command, channelid);
	}