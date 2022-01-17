function() {
            var path;
            if (!this.destination) {
                // destination is the working directory
                path = "cp -R " + this.buildDir + "/ .";
            } else {
                // otherwise relative to the package root
                path = "cp -R " + this.buildDir + "/ " + Path.join(this.options.packageHome, this.destination);
            }
            if (! this.options.dryRun) {
                childProcess.exec(path, function (error, stdout, stderr) {
                    if (error) {
                        console.log(error.stack);
                        console.log('Error code: '+error.code);
                        console.log('Signal received: '+error.signal);
                    }
                    console.log("Template expansion successful!");
                }.bind(this));
            }
        }