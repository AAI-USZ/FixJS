function(err, files) {
            if (err) throw err;
            var match;
            if (files.length !== 1 ||
                !(match = files[0].match(/^(.+)-([0-9.]+)$/))) {
                throw new SyntaxError("ELPA archives must contain exactly one " +
                                      "directory, named <package>-<version>");
            }
            name = match[1];
            version = parseVersion(match[2]);
            var pkgGroup = this.group()();
            var headerGroup = this.group()();
            var readmeGroup = this.group()();
            step(
                function() {
                    fs.readFile(tmpDir + "/" + files[0] + "/" + name + "-pkg.el", "utf8", this);
                },
                function(err, elisp) {
                    if (err) throw err;
                    return parseDeclaration(elisp);
                }, pkgGroup);
            step(
                function() {
                    fs.readFile(tmpDir + "/" + files[0] + "/" + name + ".el", "utf8", this);
                },
                function(err, elisp) {
                    if (err) throw err;
                    return getHeaders(elisp);
                }, headerGroup);
            step(
                function() {
                    fs.readFile(tmpDir + "/" + files[0] + "/README", "utf8", this);
                },
                function(err, readme) {
                    if (err) readmeGroup();
                    readmeGroup(null, readme);
                });
        }