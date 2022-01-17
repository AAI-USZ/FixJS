function () {
            expect(2);

            var started = 0,
                xhr = pklib.ajax.load({
                    url: "http://example.org/",
                    timeout: 1,
                    done: function (response) {
                        started = response;
                    }
                });
            pklib.ajax.stop(xhr);

            ok(pklib.object.is_object(xhr), "Create XMLHTTPRequest");
            strictEqual(started, 0, "Request is aborting!");
            start();
        }