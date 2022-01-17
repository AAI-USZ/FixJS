function (resp, filename) {
        var fname = jsf("", filename);
        sys.writeToFile(fname, resp);
        if (sys.getFileContent(fname) === "") {
            print(filename + ": could not be installed.");
        }
        else {
            print("Installed " + filename + " script.");
            eval(sys.getFileContent(fname));
        }
    }