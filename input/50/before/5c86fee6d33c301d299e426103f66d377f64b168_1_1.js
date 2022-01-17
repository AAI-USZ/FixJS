function (txt) {
                    module("pklib.ajax");

                    asyncTest("test_with_get_simple_plain_text", function () {
                        strictEqual(txt, "1", msg("Data.txt"));
                        start();
                    });
                }