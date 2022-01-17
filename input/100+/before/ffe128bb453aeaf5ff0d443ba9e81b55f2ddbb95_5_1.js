function(test) {
        var mp = new ks_macros.MacroProcessor({
            loader_class: ks_test_utils.JSONifyLoader
        });
        processFixture(test, mp, fixtureName,
            function (errors, result) {

                test.ok(errors, "There should be errors");
                test.equal(errors.length, 1, "There should be 1 error");

                var e = errors[0];
                test.equal(e.name, 'DocumentParsingError');
                test.notEqual(null, e.message.match(
                        /^Syntax error at line \d+, column \d+:[\s\S]*-+\^/));
                test.done();
            });
    }