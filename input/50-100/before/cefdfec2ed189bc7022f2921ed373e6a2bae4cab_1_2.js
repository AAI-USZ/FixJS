function () {
            var t = DOM.get('#test-prev');

            expect(DOM.siblings(t).length).toBe(4);

            expect(DOM.siblings(t, '.test-none').length).toBe(0);

            expect(DOM.siblings(t,
                function (elem) {
                    return elem.className === 'test-next-p';
                }).length).toBe(1);
        }