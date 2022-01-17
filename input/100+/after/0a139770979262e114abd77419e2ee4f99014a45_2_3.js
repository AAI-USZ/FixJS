function (test) {
        test.expect(3);

        var filePath = path.join(__dirname, 'output', 'alpha.js');
        var instance = new MustacheWax({
            beautify: true,
            outputFile: filePath
        });

        instance.invoke(__dirname + '/templates/alpha.mustache');

        instance.renderOutput(function (err) {
            test.ifError(err);

            fs.readFile(filePath, 'utf8', function (foul, actual) {
                test.ifError(foul);

                test.strictEqual(actual, fixtures.emptyModuleFileBeautified, "Single file beautified output mismatch.");

                test.done();
            });
        });
    }