function (code) {
                var incomingData = JSON.parse(externalData.replace('<<<<ENDIMAGE', '')),
                    dataBuffer = new Buffer(incomingData.image.replace(/^data:image\/png;base64,/, ''), 'base64');
                
                // check if phantom could be called
                if (code === 127) {
                    grunt.log.errorlns(
                      'In order for this task to work properly, PhantomJS must be ' +
                      'installed and in the system PATH (if you can run "phantomjs" at' +
                      ' the command line, this task should work). Unfortunately, ' +
                      'PhantomJS cannot be installed automatically via npm or grunt. ' +
                      'See the grunt FAQ for PhantomJS installation instructions: ' +
                      'https://github.com/cowboy/grunt/blob/master/docs/faq.md'
                    );
                    grunt.warn('PhantomJS not found.', code);
                } else {
                    // write image file
                    fs.writeFile(spriteMap, dataBuffer, done);

                    // write css file
                    fs.writeFile(cssFile, generateCSSFile(incomingData, processedImageFiles), done);

                    // output user notification
                    grunt.log.ok('Generated image: ' + spriteMap + ' & CSS file: ' + cssFile);
                }
            }