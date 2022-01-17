function (test) {
        test.expect(8);

        var dirsPath = path.join(__dirname, 'output');
        var instance = new Mustachio({
            outputDir: dirsPath
        });

        instance.invoke(__dirname + '/templates');

        instance.renderOutput(function (err) {
            test.ifError(err);

            fs.readdir(dirsPath, function (foul, dirs) {
                test.ifError(foul);

                // when remaining === 0, we are done
                var remaining = dirs.length;

                dirs.forEach(function (dirName) {
                    // construct Builder path, such as ./output/template-alpha/template-alpha.js
                    var filePath = path.join(dirsPath, dirName, dirName + '.js');

                    fs.readFile(filePath, 'utf8', function (augh, actual) {
                        test.ifError(augh);

                        var replacer = dirName.replace(instance.prefix, ''),
                            expected = fixtures.emptyModuleFile.replace(/alpha/g, replacer);

                        test.strictEqual(actual, expected, "Multiple output mismatch (" + replacer + ").");

                        if (--remaining === 0) {
                            test.done();
                        }
                    });
                });
            });
        });
    }