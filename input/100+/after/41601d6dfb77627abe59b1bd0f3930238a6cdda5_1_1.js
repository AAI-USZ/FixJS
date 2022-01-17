function(err, scripts) {
            if (err) return next(new Error(err));

            if(!scripts.length || scripts.length === 0) {
                res.statusCode = 400;
                return next(new Error("There are no scripts to archive."));
            }

            // Dump all the currently displayed scripts into temp
            scripts.forEach(function(script) {
                var newFileName = destDir + "/" + script.name;
                var fd = fs.openSync(newFileName, 'w', 0755);
                fs.writeSync(fd, script.code);
                fs.closeSync(fd);
            });

            // Create a zip from destDir
            // Options -r recursive -j ignore directory info - redirect to stdout
            var zip = spawn('zip', ['-rj', '-', destDir]);

            res.contentType('zip');

            // Keep writing stdout to res
            zip.stdout.on('data', function (data) {
                res.write(data);
            });

            zip.stderr.on('data', function (data) {
                // Uncomment to see the files being added
                // console.log('zip stderr: ' + data);
            });

            // End the response on zip exit
            zip.on('exit', function (code) {
                if (code !== 0) {
                    res.statusCode = 500;
                    console.log('zip process exited with code ' + code);
                    return next(new Error('Error creating ZIP file, zip command exited with code: ' + code));
                } else {
                    wrench.rmdirSyncRecursive(destDir);
                    res.end();
                }
            });
        }