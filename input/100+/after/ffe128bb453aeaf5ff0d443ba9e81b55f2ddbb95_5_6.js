function (test) {
        var done = false;
        var mp = new ks_macros.MacroProcessor({ 
            macro_timeout: 500,
            loader_class: ks_test_utils.JSONifyLoader
        });
        setTimeout(function () {
            if (done) { return; }
            test.ok(false, 'Test timed out, assuming a hang.');
            test.done();
        }, 250);
        processFixture(test, mp, 'macros-no-macros.txt',
            function (errors, result) {
                test.ok(!errors, "There should be no errors");
                test.done();
                done = true;
            }
        );
    }