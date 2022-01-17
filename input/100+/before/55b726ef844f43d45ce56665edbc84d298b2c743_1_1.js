function (source, filename, object, key) {
		sys.writeToFile("script_" + filename + ".json", resp);
		if (sys.getFileContent("script_" + filename + ".json") === undefined) {
			print(filename + " default settings could not be installed.");
		}
		else {
			global[object][key] = JSON.parse(sys.getFileContent("script_" + filename + ".json"));
			print("Installed " + filename + " default settings.");
		}
	}