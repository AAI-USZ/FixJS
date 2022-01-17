function () {
        var opts    = this.options,
            inFile  = opts.infile,
            outFile = opts.outfile,
            inPaths,
            outPaths,
            outExists,
            outIsDir
        ;
        
        if (!outFile) {
            this.printStdout = true;
            outIsDir = false;
        }
        else {
            outExists = existsSync(outFile);
            outIsDir = outExists && FS.statSync(outFile).isDirectory();
        }
        
        if (inFile) {
            if (!existsSync(inFile)) {
                throw new Error("Can not read from '" + inFile + "'. Path does not exist.");
            }

            if (FS.statSync(inFile).isDirectory()) {
                inPaths = FS.readdirSync(inFile).
                    filter(filterDirectory).
                    map(function (filename) {
                        return Path.join(inFile, filename);
                    });

                if (outIsDir) {
                    opts.infile = inPaths;
                    opts.outfile = inPaths.map(function (path) {
                        return Path.join(outFile, Path.basename(path));
                    });
                }
                else {
                    opts.infile = "";
                    opts.prefuse = opts.prefuse ?
                        opts.prefuse.concat(inPaths) :
                        inPaths;
                }
            }
        }
    }