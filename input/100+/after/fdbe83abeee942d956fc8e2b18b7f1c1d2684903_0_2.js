function () {
                http.get({
                    host: "localhost",
                    port: 8081,
                    path: "/user/"+token+"/login"
                }, function(response) {
                    var data = "";
                    fluid.log("Callback from use login called");

                    response.on("data", function (chunk) {
                        fluid.log("Response from server: " + chunk);
                        data += chunk;
                    });
                    response.on("close", function(err) {
                        if (err) {
                            jqUnit.assertFalse("Got an error on login:" + err.message, true);
                            jqUnit.start();
                        }
                        fluid.log("Connection to the server was closed");
                    });
                    response.on("end", function() {
                        fluid.log("Connection to server ended");
                        jqUnit.assertNotEquals("Successful login message returned", data.indexOf("User was successfully logged in."), -1);
                        setTimeout(function() {
                            checkSettings(json.loggedInState);
                            jqUnit.start();
                        }, 5000);
                    });
                }).on('error', function(err) {
                    fluid.log("Got error: " + err.message);
                    jqUnit.start();
                });
                jqUnit.stop();
            }