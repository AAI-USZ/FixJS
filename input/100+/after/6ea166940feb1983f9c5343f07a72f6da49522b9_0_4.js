function(filename, callback) {
        if (filename) {
            //read in the jade file
            var data = fs.readFileSync(filename, 'utf8');
            var options = {
                pretty: true, 
                compress: false,
                yuicompress: false,
                optimization: 1,
                silent: false,
                color: true,
                paths: [path.dirname(filename)],
                strictImports: false };

            try {
                less.render(data, options, ScopeLocker.lock(this, function(e, css) {
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
                }));
            }
            catch (err) {
                if (typeof(err) == 'object') {
                    var message = 'Syntax Error in ' + filename;
                    if (err.line)
                        message += ' at line ' + err.line;
                    if (err.column)
                        message += ',' + err.column + ':\t';
                    if (err.message)
                        message += err.message + '\n';
                    if (err.extract)
                        message += err.extract.join('\n');
                    if (callback)
                        callback(message, filename);
                    else
                        console.log(message);
                } else if (callback)
                    callback(err, filename);
            }
        }
    }