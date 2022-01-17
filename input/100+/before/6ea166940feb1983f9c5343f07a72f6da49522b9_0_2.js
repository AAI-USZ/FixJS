function(filename, callback) {
        if (filename) {
            //read in the jade file
            var data = fs.readFileSync(filename, 'utf8');

            try {
                var jadeCompiler = jade.compile(data, {pretty: true});
                var jadeHtml = jadeCompiler({DEBUG: true, COMPILE_TIME: new Date()});
            } catch(err) {
                callback(err, filename);
                return;
            }

            //write to the output directory
            var pathToBuildFile = filename.replace(this.sourceDirectory, this.outputDirectory).replace(/\.jade$/, '.html');
            //make sure the path exists
            if (!path.existsSync(path.dirname(pathToBuildFile)))
                mkdirp(path.dirname(pathToBuildFile), 0755);

            if (jadelesscoffee.Compiler.verbose) { console.log(filename + ' finished Jade compile; Writing to ' + pathToBuildFile) }

            fs.writeFile(pathToBuildFile, jadeHtml);

            this.compileCount++;
                callback(null, filename);
        }
    }