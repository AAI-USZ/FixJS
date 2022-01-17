function _createFile(options, fileName, sourceRoot, destRoot) {
            var err;
            var dest = path.join(destRoot, fileName) ;
            dest = _templatePathName(dest, options);

            if(existsSync(dest)) {
                err = 'file exists: ' + '  ' + dest + '   -Not Overwritten.';
                sys.puts(err);
            }

            var sourceFile = path.join(sourceRoot, fileName );
            if(!existsSync(sourceFile)) {
                err = 'template file not found' + ' ' + sourceFile + '. Halting generation of: ' + dest;
                sys.puts(err);
            }

            if (!err) {
                var sourceTemplate = fs.readFileSync(sourceFile, 'ascii');
                var template = Handlebars.compile(sourceTemplate);

                var result = template(options);
                fs.writeFileSync(dest, result);
                sys.puts('created file: ' + dest);
            }
        }