function(err, cmdpath) {
            if(err) return grunt.helper('not installed', 'optipng', cb);

            var args = opts.args ? opts.args : [];
                args = args.concat(files);

            if(!files.length) return cb();

            grunt.log.writeln('Running optipng... ' + grunt.log.wordlist(files));

            if (output && !args.join('').match('-dir') ) {
                args.push('-dir', output, '-clobber');
            }

            var optipng = grunt.utils.spawn({
                cmd: cmdpath,
                args: args
            }, function(code) {
                if(code) grunt.warn('optipng 0.7 or earlier is required, you could download and compile its source code on http://optipng.sourceforge.net/');
                cb();
            });

            optipng.stdout.pipe(process.stdout);
            optipng.stderr.pipe(process.stderr);
            optipng.on('exit', function(code) {
                if(code) grunt.warn('optipng exited unexpectedly with exit code ' + code + '.', code);
                cb();
            });


        }