function () {
            var error = 1,
                xhr = pklib.ajax.load({
                    url: "http://example.org/",
                    error: function () {
                        error = 1;
                    }
                });
            module("pklib.ajax");

            test("test_error_request", function () {
                ok(pklib.object.is_object(xhr), "Create XMLHTTPRequest");
                strictEqual(error, 1, "Error request");
            });
        }