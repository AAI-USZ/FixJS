function () {
            expect(1);

            pklib.ajax.load({
                url: DIR + "data.txt",
                timeout: 2000,
                done: function (txt) {
                    strictEqual(txt, "1", msg("Data.txt"));
                    start();
                }
            });
        }