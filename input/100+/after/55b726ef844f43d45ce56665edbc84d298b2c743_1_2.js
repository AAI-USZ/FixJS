function (source, filename, object, key) {
		if (sys.getFileContent("script_" + filename + ".json") === undefined) {
			sys.webCall(source + "script_" + filename + ".json", "downloadjson('" + source + "', '" + filename + "', '" + object + "', '" + key + "');");
		}
		else {
			print("Loaded " + filename + " settings.");
			try {
				global[object][key] = JSON.parse(sys.getFileContent("script_" + filename + ".json"));
			}
			catch (error) {
				sys.writeToFile("script_" + filename + " (corrupted).json", sys.getFileContent("script_" + filename + ".json"));
				print(filename + " file corrupted - downloading latest " + filename + " file...");
				sys.webCall(source + "script_" + filename + ".json", "downloadjson('" + source + "', '" + filename + "', '" + object + "', '" + key + "');");
				return;
			}
		}
	}