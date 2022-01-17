function (resp) {
        var file = jsonf("", "construction");
        sys.writeToFile(file, resp);
        if (sys.getFileContent(file) === "") {
            print(filename + ": default settings could not be installed.");
        }
        else {
            construction = JSON.parse(sys.getFileContent(file));
            construct();
            print("Installed construction default settings.");
        }
    }