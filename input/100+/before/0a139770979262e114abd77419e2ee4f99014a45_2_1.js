function (test) {
        test.expect(5);

        var instance = new Mustachio();

        test.ok(Array.isArray(instance.output), "Instance 'output' property not set.");
        test.ok('object' === typeof instance.known, "Instance 'known' property not set.");

        test.strictEqual(instance.argv.modulePrefix, "template", "Incorrect modulePrefix default.");
        test.strictEqual(instance.prefix, "template-", "Incorrect instance.prefix default.");

        test.ok(instance.pregex.test('"template-foo"'), "Prefix regular expression incorrect.");

        test.done();
    }