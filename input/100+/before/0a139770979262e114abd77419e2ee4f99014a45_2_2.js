function (test) {
        test.expect(3);

        var filePath = path.join(__dirname, 'output', 'alpha.js');
        var instance = new Mustachio({
            outputFile: filePath
        });

        instance.invoke(__dirname + '/templates/alpha.mustache');

        instance.renderOutput(function (err) {
            test.ifError(err);

            fs.readFile(filePath, 'utf8', function (foul, actual) {
                test.ifError(foul);

                test.strictEqual(actual, fixtures.emptyModuleFile, "Single file output mismatch.");

                test.done();
            });
        });
    }