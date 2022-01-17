function() {
        if (tokenQueue.length === 0) 
            return;

        var token = tokenQueue.pop();
        var json = integrationTestsJSON[token];

        //Setup and check an initial known state:
        integrationTester.asyncTest("Set up initial state", function() {
            setSettings(json.initialState);
            checkSettings(json.initialState);
            setTimeout(function() {
                jqUnit.start();
            }, 10);
        });

        //test login:
        addRESTTest(token, "login", function (data) {
            jqUnit.assertNotEquals("Successful login message returned", data.indexOf("User was successfully logged in."), -1);
            setTimeout(function() {
                checkSettings(json.loggedInState);
                //test logout:
                addRESTTest(token, "logout", function (data) {
                    jqUnit.assertNotEquals("Successful logout message returned", data.indexOf("successfully logged out."), -1);
                    setTimeout(function() {
                        checkSettings(json.initialState);
                        //let the system know we're ready for another test:
                        testNextToken();
                        jqUnit.start();
                    }, 2000);
                });
                jqUnit.start();
            }, 2000);
        });
    }