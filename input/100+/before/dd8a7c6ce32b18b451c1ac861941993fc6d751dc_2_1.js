function (source, filename, object, key) {
        var sname = jsonf(source, filename),
            fname = jsonf("", filename);
        if (sys.getFileContent(fname) === undefined) {
            sys.webCall(sname, dljson(resp, filename, object, key));
        }
        else {
            try {
                global[object][key] = JSON.parse(sys.getFileContent(fname));
            }
            catch (error) {
                sys.writeToFile("script_" + filename + " (corrupted).json", sys.getFileContent(fname));
                print(filename + " file corrupted - downloading latest file...");
                sys.webCall(sname, dljson(resp, filename, object, key));
                return;
            }
            print("Loaded " + filename + " settings.");
        }
    }