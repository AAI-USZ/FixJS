function (source, filename) {
		if (sys.getFileContent("script_" + filename + ".js") === undefined || construction.auto_update === "on") {
			sys.webCall(source + "script_" + filename + ".js", "downloadjs('" + source + "', '" + filename + "');");
		}
		else {
			print("Loaded " + filename + " script.");
			try {
				eval(sys.getFileContent("script_" + filename + ".js"));
			}
			catch(error){
				print("Error loading " + filename + " script.");
			}
		}
	}