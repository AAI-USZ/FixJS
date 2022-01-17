function (json) {
                    module("pklib.ajax");

                    asyncTest("test_with_get_simple_json_file", function () {
                        json = eval("[" + json + "]")[0];
                        strictEqual(json.data, 1, msg("Data.json"));
                        start();
                    });
                }