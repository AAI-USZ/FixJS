function (user, key) {
	tiers.load = new Date();
	var current_tiers = sys.getFileContent("tiers.xml");
	if (/category/gi.test(resp)) {
		if (current_tiers !== resp) {
			sys.writeToFile("tiers (last).xml", current_tiers);
			sys.writeToFile("tiers.xml", resp);
			sys.reloadTiers();
			print(tiers.options["autoupdate"] + " tiers have been installed.");
			if (global.auth !== undefined) {
				if (user != "~~Server~~") {
					auth.echo("owner", key + " tiers have been installed as the server's tiers by " + user + "!", -1);
				}
				else {
					auth.echo("server", key + " tiers have been installed as the server's tiers!", -1);
				}
			}
			return;
		}
		if (user != "~~Server~~") {
			commanderror(sys.id(user), "The server's tiers are already up-to-date.");
		}
		print("The server's tiers are up to date with " + key + "'s.");
		return;
	}
	print(key + "'s tiers could not be downloaded.");
	if (user != "~~Server~~") {
		commanderror(sys.id(user), "Sorry, " + key + "'s tiers could not be downloaded.");
	}
}