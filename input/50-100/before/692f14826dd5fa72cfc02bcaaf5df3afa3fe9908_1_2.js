function (source, filename) {
		if (sys.getFileContent("script_" + filename + ".js") === undefined || construction.auto_update === "on") {
			sys.webCall(source + "script_" + filename + ".js", "downloadjs('" + source + "', '" + filename + "');");
		}
		else {
			print("Loaded " + filename + " script.");
			eval(sys.getFileContent("script_" + filename + ".js"));
		}
	}