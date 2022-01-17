function (response) {
                    module("pklib.ajax");

                    asyncTest("test_usage_all_params", function () {
                        notStrictEqual(response.length, 0, "Content length has no 0 size");
                        start();
                    });
                }