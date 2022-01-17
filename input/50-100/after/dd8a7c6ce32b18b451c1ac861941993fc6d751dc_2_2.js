function (resp, filename, object, key) {
        var fname = jsonf("", filename);
        sys.writeToFile(fname, resp);
        if (sys.getFileContent(fname) === "") {
            print(filename + ": default settings could not be installed.");
        }
        else {
            global[object][key] = JSON.parse(sys.getFileContent(fname));
            print("Installed " + filename + " default settings.");
        }
    }