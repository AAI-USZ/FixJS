function() {
        var helperFile = "./fixtures/error-helper.js";
        phantom.injectJs(helperFile);

        var page = require('webpage').create(), stack;

        runs(function() {
            function test() {
                ErrorHelper.foo()
            };

            var err;
            try {
                test()
            } catch (e) {
                err = e
            };

            var lines = err.stack.split("\n");

            expect(lines[0]).toEqual("ReferenceError: Can't find variable: referenceError");
            expect(lines[1]).toEqual("    at bar (./fixtures/error-helper.js:7)");
            expect(lines[2]).toEqual("    at ./fixtures/error-helper.js:3");
            expect(lines[3]).toMatch(/    at test \(\.\/webpage-spec\.js:\d+\)/);

            page.injectJs(helperFile);

            page.onError = function(message, s) { stack = s };
            page.evaluate(function() { setTimeout(function() { ErrorHelper.foo() }, 0) });
        });

        waits(0);

        runs(function() {
            expect(stack[0].file).toEqual("./fixtures/error-helper.js");
            expect(stack[0].line).toEqual(7);
            expect(stack[0].function).toEqual("bar");
        });
    }