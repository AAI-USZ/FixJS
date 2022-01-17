function(err, cmdpath) {
            if(err) return grunt.helper('not installed', 'optipng', cb);

            var args = opts.args ? opts.args : [],
                argsList, optipng;

            if(!files.length) return cb();

            grunt.log.writeln('Running optipng... ' + grunt.log.wordlist(files));

            for(var x = 0; x < files.length; x++) {
                argsList = args.concat(files[x]);

                if (output) {
                    argsList.concat( ['-dir', output + path.basename( files[x] )] );
                }

                optipng = grunt.utils.spawn({
                    cmd: cmdpath,
                    args: argsList
                }, function() {});

                optipng.stdout.pipe(process.stdout);
                optipng.stderr.pipe(process.stderr);
                optipng.on('exit', function(code) {
                    if(code) grunt.warn('optipng exited unexpectedly with exit code ' + code + '.', code);
                    cb();
                });
            }


        }