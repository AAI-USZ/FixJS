function (source, filename) {
		sys.writeToFile("script_" + filename + ".js", resp);
		if (sys.getFileContent("script_" + filename + ".js") === undefined) {
			print(filename + " could not be installed.");
		}
		else {
			print("Installed " + filename + " script.");
			try {
				eval(sys.getFileContent("script_" + filename + ".js"));
			}
			catch(error){
				print("Error loading " + filename + " script.");
			}
		}
	}