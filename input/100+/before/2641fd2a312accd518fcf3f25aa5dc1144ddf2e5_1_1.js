function (startup) {
		var current_script = sys.getFileContent("scripts.js");
		if (construction.auto_update === "on" && /download/gi.test(resp)) {
			if (current_script !== resp) {
				sys.writeToFile("scripts (last).js", current_script);
				if (startup) {
					sys.writeToFile("scripts.js", resp);
					sys.changeScript(resp, true);
				}
				else {
					sys.writeToFile("scripts.js", resp);
					sys.changeScript(resp);
				}
				print("Script Updated!");
				return;
			}
			print("Script is up-to-date.");
		}
	}