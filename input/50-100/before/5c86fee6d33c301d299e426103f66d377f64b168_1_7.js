function () {
            var started = 0,
                xhr = pklib.ajax.load({
                    url: "http://www.google.com/",
                    timeout: 2000,
                    done: function (response) {
                        started = response;
                    }
                });
            pklib.ajax.stop(xhr);
            module("pklib.ajax");

            test("test_stopping_request", function () {
                ok(pklib.object.is_object(xhr), "Create XMLHTTPRequest");
                strictEqual(started, 0, "Request is aborting!");
            });
        }