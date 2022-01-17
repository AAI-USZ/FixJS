function(filePath, baseDir) {
        if (baseDir == undefined) baseDir = filePath;
        var files = fs.readdirSync(filePath);
        for (var i = files.length - 1; i >= 0; i--) {
            var filename = path.join(baseDir, '/', files[i]);
            var stats = fs.statSync(filename);
            //We need to get the data on this file. If it's a directory we want to recurse this on it as well.
            try {
                if (stats.isDirectory()) {
                    this.readDirectory(filename, filename);
                    continue;
                }
            }
            catch(error) {
                continue;
            }

            if (!jadelesscoffee.Compiler.EXTENSIONS_REGEX.test(filename))
                continue;
            if (this.currentlyWatching.indexOf(filename) < 0) {
                fs.watch(filename, this.onFileChangeDelegate);
                this.currentlyWatching.push(filename);
                this.compiler.compileHistory[filename] = stats.mdate;
            }
        };
    }