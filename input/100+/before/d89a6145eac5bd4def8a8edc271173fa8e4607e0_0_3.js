function (data) {
        jqUnit.assertNotEquals("Successful login message returned", data.indexOf("User was successfully logged in."), -1);
            checkSettings(json.loggedInState);
            //test logout:
            addRESTTest(token, "logout", function (data) {
                jqUnit.assertNotEquals("Successful logout message returned", data.indexOf("successfully logged out."), -1);
                checkSettings(json.initialState);
                //let the system know we're ready for another test:
                testNextToken();
                jqUnit.start();
            });
            jqUnit.start();
        }