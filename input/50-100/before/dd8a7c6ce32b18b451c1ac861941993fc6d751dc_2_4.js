function (source, filename) {
        var sname = jsf(source, filename),
            fname = jsf("", filename);

        if (sys.getFileContent(fname) === undefined || construction.auto_update === "on") {
            sys.webCall(sname, dljs(resp, file));
        }
        else {
            print("Loaded " + filename + " script.");
            eval(sys.getFileContent(fname));
        }
    }