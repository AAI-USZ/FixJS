function (test) {
        test.expect(2);

        var instance = new MustacheWax({
            simple: true
        });

        instance.invoke(__dirname + '/templates/alpha.mustache');

        test.strictEqual(instance.output.length, 1, "Output array empty");
        test.strictEqual(instance.render(), fixtures.emptyCompiledFunction, "Simple output mismatch.");

        test.done();
    }