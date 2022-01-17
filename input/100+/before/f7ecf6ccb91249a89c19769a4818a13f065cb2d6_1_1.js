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

            var frame;

            frame = err.stack[0];
            expect(frame.sourceURL).toEqual(helperFile);
            expect(frame.line).toEqual(7);
            expect(frame.function).toEqual("bar");

            frame = err.stack[1];
            expect(frame.sourceURL).toEqual(helperFile);
            expect(frame.line).toEqual(3);
            expect(frame.function).toEqual("foo");

            frame = err.stack[2];
            expect(frame.sourceURL).toMatch(/webpage-spec.js$/);
            expect(frame.function).toEqual("test");
        }