function() {
            expect(lastError.toString()).toEqual("ReferenceError: Can't find variable: referenceError");

            page.evaluate(function() { referenceError2 });
            expect(lastError.toString()).toEqual("ReferenceError: Can't find variable: referenceError2");

            page.evaluate(function() { throw "foo" });
            expect(lastError).toEqual("foo");

            page.evaluate(function() { throw Error("foo") });
            expect(lastError.toString()).toEqual("Error: foo");
        }