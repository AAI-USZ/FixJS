function() {
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
        }