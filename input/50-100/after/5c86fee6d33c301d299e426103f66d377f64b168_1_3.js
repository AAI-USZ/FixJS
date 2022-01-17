function (json) {
                    json = eval("[" + json + "]")[0];
                    strictEqual(json.data, 1, msg("Data.json"));
                    start();
                }