function(err, pkg_, headers, readme) {
            if (err) throw err;
            pkg = pkg_[0];
            headers = headers[0];
            readme = readme[0];
            if (!_.isEqual(pkg.name, name)) {
                throw new SyntaxError("Package name \"" + pkg.name + "\" in " +
                                      name + "-pkg.el" + " doesn't match " +
                                      "archive name \"" + name + "\"!");
            } else if (!_.isEqual(pkg.version, version)) {
                throw new SyntaxError("Package version \"" +
                                      pkg.version.join(".") + "\" in " + name +
                                      "-pkg.el doesn't match archive version " +
                                      '"' + version.join(".") + '"!');
            }

            pkg.headers = headers;
            pkg.commentary = readme;
            return pkg;
        }