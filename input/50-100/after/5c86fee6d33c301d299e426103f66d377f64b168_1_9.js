function () {
            expect(1);

            var xhr = pklib.ajax.load({
                url: "http://example.org/",
                timeout: 2000
            });

            ok(pklib.object.is_object(xhr), "Create XMLHTTPRequest");
        }