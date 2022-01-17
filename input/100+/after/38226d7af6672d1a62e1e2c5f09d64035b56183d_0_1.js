function () {
            http.get({
                host: "localhost",
                port: 8081,
                path: "/user/"+token+"/"+action
            }, function(response) {
                var data = "";
                fluid.log("Callback from use "+action+" called");

                response.on("data", function (chunk) {
                    fluid.log("Response from server: " + chunk);
                    data += chunk;
                });
                response.on("close", function(err) {
                    if (err) {
                        jqUnit.assertFalse("Got an error on "+action+": " + err.message, true);
                        jqUnit.start();
                    }
                    fluid.log("Connection to the server was closed");
                });
                response.on("end", function() {
                    fluid.log("Connection to server ended");
                    onEnd(data);
                });
            }).on('error', function(err) {
                fluid.log("Got error: " + err.message);
                jqUnit.start();
            });
        }