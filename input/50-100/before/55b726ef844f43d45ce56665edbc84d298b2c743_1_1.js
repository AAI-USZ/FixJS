function () {
		sys.writeToFile("script_construction.json", resp);
		if (sys.getFileContent("script_construction.json") === undefined) {
			print(filename + " default settings could not be installed.");
		}
		else {
			construction = JSON.parse(sys.getFileContent("script_construction.json"));
			construct();
			print("Installed construction default settings.");
		}
	}