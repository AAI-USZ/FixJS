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

          var pkgGroup = this.parallel();
	  var headerGroup = this.parallel();
	  var readmeGroup = this.parallel();
	  fs.readFile(tmpDir + "/" + files[0] + "/" + name + "-pkg.el", "utf8", function(err, elisp) {
	    if (err) {
	      pkgGroup(err);
            }
	    else {
	      pkgGroup(null, parseDeclaration(elisp));
            }
	  });
	  fs.readFile(tmpDir + "/" + files[0] + "/" + name + ".el", "utf8", function(err, elisp) {
	    if (err) {
	      headerGroup(err);
            }
	    else {
              headerGroup(null, getHeaders(elisp));
            }
	  });
	  fs.readFile(tmpDir + "/" + files[0] + "/README", "utf8", function(err, readme) {
	    if (err) {
	      readmeGroup();
            }
	    else {
              readmeGroup(null, readme);
            }
          });
        }