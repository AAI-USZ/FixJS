function run(file) {
                if(!file) return cb();

                grunt.log.subhead('** Processing: ' + file);

                var jpegtran = grunt.utils.spawn({
                  cmd: cmdpath,
                  args: opts.args.concat(file)
                }, function() {});

                var outputPath;
                if (output) {
                    outputPath = output + path.basename(file);
                    try {
                        grunt.file.read(outputPath);
                    } catch(err) {
                        grunt.file.write(outputPath);   
                    }
                    grunt.log.writeln('Output file: ' + outputPath);
                } else {
                    outputPath = file;
                }

                jpegtran.stdout.pipe(process.stdout);
                jpegtran.stderr.pipe(process.stderr);

                jpegtran.on('exit', function(code) {
                  if(code) return grunt.warn('jpgtran exited unexpectedly with exit code ' + code + '.', code);
                  // output some size info about the file
                  grunt.helper('min_max_stat', 'jpgtmp.jpg', file);
                  // copy the temporary optimized jpg to original file
                  fs.createReadStream('jpgtmp.jpg')
                    .pipe(fs.createWriteStream(outputPath)).on('close', function() {
                      run(files.shift());
                    });
                });
            }