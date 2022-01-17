function () {
            expect(2);

            var xhr = pklib.ajax.load({
                timeout: 300,
                url: "http://localhost/error/",
                error: function () {
                    ok(pklib.object.is_object(xhr), "Create XMLHTTPRequest");
                    ok("Error request");
                    start();
                }
            });
        }