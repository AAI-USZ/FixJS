function() {
            page.evaluate(function() {
                console.log("PASS");
            });
            page.evaluate(testPrimitiveArgs,
                true,
                0,
                "`~!@#$%^&*()_+-=[]\\{}|;':\",./<>?",
                undefined,
                null);
            page.evaluate(testComplexArgs,
                {a:true, b:0, c:"string"},
                function() { return true; },
                [true, 0, "string"],
                /\d+\w*\//);
            expect(message).toEqual("PASS");
        }