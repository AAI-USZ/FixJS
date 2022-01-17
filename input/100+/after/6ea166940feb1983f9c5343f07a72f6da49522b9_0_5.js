function(filename, callback) {
        if (filename) {
            //read in the jade file
            var data = fs.readFileSync(filename, 'utf8');

            try {
                var coffeeJs = coffee.compile(data, {pretty: true});
            }
            catch(err) {
                if (callback)
                    callback(err, filename);
                return;
            }

            //write to the output directory
            var pathToBuildFile = filename.replace(this.sourceDirectory, this.outputDirectory).replace(/\.coffee$/, '.js');
            //make sure the path exists
            if (!path.existsSync(path.dirname(pathToBuildFile)))
                mkdirp(path.dirname(pathToBuildFile), 0755);

            if (jadelesscoffee.Compiler.verbose) { console.log(filename + ' finished CoffeeScript compile; Writing to ' + pathToBuildFile) }

            fs.writeFile(pathToBuildFile, coffeeJs);
            this.compileCount++;
            if (callback)
                callback(null, filename);
        }
    }