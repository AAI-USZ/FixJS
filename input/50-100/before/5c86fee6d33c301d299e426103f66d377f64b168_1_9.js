function () {
            var xhr = pklib.ajax.load({
                url: "http://example.org/",
                timeout: 2000
            });
            module("pklib.ajax");

            test("test_timeout_request", function () {
                ok(pklib.object.is_object(xhr), "Create XMLHTTPRequest");
            });
        }