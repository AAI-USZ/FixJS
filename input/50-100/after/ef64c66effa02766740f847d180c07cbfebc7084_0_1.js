function (test) {
        var mp = new ks_macros.MacroProcessor({
            loader_class: ks_test_utils.JSONifyLoader
        });
        processFixture(test, mp, 'macros-document-escaped-quotes.txt',
            function (errors, result) {
                test.ok(!errors, "There should be no errors");
                test.done();
            });
    }