function (tests) {
        fluid.each(tests, function(v) {
            testOneExpander(v.message, v.model || source, v.expander, v.method, v.expected);
        });
    }