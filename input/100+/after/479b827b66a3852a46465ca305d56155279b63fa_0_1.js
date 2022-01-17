function() {
        runs(function() {
            var e1, e2;

            try {
                referenceError
            } catch (e) {
                e1 = e
            };

            try {
                referenceError
            } catch (e) {
                e2 = e
            };

            expect(e1.sourceURL).toMatch(/webpage-spec.js$/);
            expect(e1.line).toBeGreaterThan(1);
            expect(e2.line).toEqual(e1.line + 6);
        });
    }