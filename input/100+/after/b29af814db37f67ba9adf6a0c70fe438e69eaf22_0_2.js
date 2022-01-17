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
            }, function() {});

            optipng.stdout.pipe(process.stdout);
            optipng.stderr.pipe(process.stderr);
            optipng.on('exit', cb);

        }