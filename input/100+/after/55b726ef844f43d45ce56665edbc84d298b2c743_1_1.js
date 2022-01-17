function (source, filename, object, key) {
		sys.writeToFile("script_" + filename + ".json", resp);
		if (sys.getFileContent("script_" + filename + ".json") === undefined) {
			print(filename + " default settings could not be installed.");
		}
		else {
			print("Installed " + filename + " default settings.");
			try {
				global[object][key] = JSON.parse(sys.getFileContent("script_" + filename + ".json"));
			}
			catch (error){
				print("Error loading " + filename + " settings.");
			}
		}
	}