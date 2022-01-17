function () {
		sys.writeToFile("script_construction.json", resp);
		if (sys.getFileContent("script_construction.json") === undefined) {
			print(filename + " default settings could not be installed.");
		}
		else {
			print("Installed construction default settings.");
			try {
				construction = JSON.parse(sys.getFileContent("script_construction.json"));
			}
			catch(error){
				print("Error loading construction settings.");
				return;
			}
			construct();
		}
	}