function () {
            expect(1);

            pklib.ajax.load({
                url: DIR + "data.json",
                timeout: 2000,
                done: function (json) {
                    json = eval("[" + json + "]")[0];
                    strictEqual(json.data, 1, msg("Data.json"));
                    start();
                }
            });
        }