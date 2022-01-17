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
                    if (e) {
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
                    callback(null, filename);
                }));
            }
            catch (err) {
                if (typeof(err) == 'object')
                    callback("Syntax Error in " + filename + " at line " + err.line + ',' + err.column + ':\t' + err.message + '\n' + err.extract.join('\n'), filename);
                else
                    callback(err, filename);
            }
        }
    }