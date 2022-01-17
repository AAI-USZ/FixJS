function(command, cb) {
        var baseDir = "node_modules";

        function searchModules(dirs, it) {
            if (!dirs[it])
                return cb(false);

            var currentDir = baseDir + "/" + dirs[it];
            Fs.readFile(currentDir + "/package.json", "utf-8", function(err, file) {
                if (err)
                    return searchModules(dirs, it+1);

                try {
                    file = JSON.parse(file);
                }
                catch (ex) {
                    return searchModules(dirs, it+1);
                }

                if (!file.bin)
                    return searchModules(dirs, it+1);

                for (var binIdent in file.bin) {
                    if (binIdent === command)
                        return cb(true, currentDir + "/" + file.bin[binIdent]);
                }

                searchModules(dirs, it+1);
            });
        }

        Fs.readdir(baseDir, function(err, res) {
            if (err)
                return cb(false);

            searchModules(res, 0);
        });
    }