function (test) {
        var mp = new ks_macros.MacroProcessor({ 
            macro_timeout: 500,
            loader_class: ks_test_utils.JSONifyLoader
        });
        processFixture(test, mp, 'macros-document-double-brace.txt',
            function (errors, result) {
                test.ok(!errors, "There should be no errors");
                test.done();
            });
    }