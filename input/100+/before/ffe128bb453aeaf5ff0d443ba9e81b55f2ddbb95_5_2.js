function (test) {
        var mp = new ks_macros.MacroProcessor({
            loader_class: ks_test_utils.JSONifyLoader
        });
        processFixture(test, mp, 'macros-document-syntax-error.txt',
            function (errors, result) {

                test.ok(errors, "There should be errors");
                test.equal(errors.length, 1, "There should be 1 error");

                var e = errors[0];
                test.equal(e.name, 'DocumentParsingError');
                test.equal(0, e.message.indexOf('Syntax error at line'));

                // Note: This is a *bit* brittle, but it makes sure the error
                // indicator appears at the expected spot in the context lines
                // included in the message.
                test.equal(265, e.message.indexOf('-----------------------------^'));

                test.done();
            });
    }