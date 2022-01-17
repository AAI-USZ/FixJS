function() {
        var server = require('webserver').create();
        server.listen(12345, function(request, response) {
        // echo received request headers in response body
            response.write(JSON.stringify(request.headers));
            response.close();
        });

        var url = "http://localhost:12345/foo/headers.txt?ab=cd";

        var cookies = [];
        cookies[0] = {
            'name' : 'Cookie-Name',
            'value' : 'Cookie-Value',
            'domain' : 'localhost'
        };
        page.setCookies(cookies);

        var handled = false;
        runs(function() {
            expect(handled).toEqual(false);
            page.open(url, function (status) {
                expect(status == 'success').toEqual(true);
                handled = true;

                var echoedHeaders = JSON.parse(page.plainText);
                // console.log(JSON.stringify(echoedHeaders));
                expect(echoedHeaders["Cookie"]).toEqual("Cookie-Name=Cookie-Value");
            });
        });

        waits(50);

        runs(function() {
            expect(handled).toEqual(true);
            server.close();
        });

    }