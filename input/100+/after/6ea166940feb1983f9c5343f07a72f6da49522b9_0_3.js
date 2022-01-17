function(e, css) {
                    if (e && callback) {
                        callback(e.message, filename)
                        return;
                    }
                    
                    var pathToBuildFile = filename.replace(this.sourceDirectory, this.outputDirectory).replace(/\.less$/, '.css');
                    //make sure the path exists
                    if (!path.existsSync(path.dirname(pathToBuildFile)))
                        mkdirp(path.dirname(pathToBuildFile), 0755);
                
                    if (jadelesscoffee.Compiler.verbose) { console.log(filename + ' finished Less compile; Writing to ' + pathToBuildFile) }

                    fs.writeFile(pathToBuildFile, css);
                    this.compileCount++;
                    if (callback)
                        callback(null, filename);
                }