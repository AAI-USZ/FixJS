function () {
        gpii.flowManager();

        fluid.each(integrationTestsJSON, function (json, token) {
            //Setup and check an initial known state:
            integrationTester.asyncTest("Set up initial state", function() {
                setSettings(json.initialState);
                checkSettings(json.initialState);
                setTimeout(function() {
                    jqUnit.start();
                }, 10);
            });

            //test login with token
            integrationTester.asyncTest("Test "+token+" Login", function () {
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
            });

            integrationTester.asyncTest("Test "+token+" logout", function () {
                http.get({
                    host: "localhost",
                    port: 8081,
                    path: "/user/"+token+"/logout"
                }, function(response) {
                    var data = "";
                    response.on("data", function (chunk) {
                        fluid.log("Response from server: " + chunk);
                        data += chunk;
                    });
                    response.on("close", function(err) {
                        if (err) {
                            jqUnit.assertFalse("Got an error on logout:" + err.message, true);
                            jqUnit.start();
                        }
                        fluid.log("Connection to the server was closed");
                    });
                    response.on("end", function() {
                        fluid.log("Logout connection to server ended");
                        jqUnit.assertNotEquals("Successful logout message returned", data.indexOf("successfully logged out."), -1);
                        //After successful logout, get settings and check that they have been properly reset
                        setTimeout(function () {
                            checkSettings(json.initialState);
                            jqUnit.start();
                        }, 5000);
                    });
                }).on('error', function(err) {
                    fluid.log("Got error: " + err.message);
                    jqUnit.start();
                });
            });
        });
    }