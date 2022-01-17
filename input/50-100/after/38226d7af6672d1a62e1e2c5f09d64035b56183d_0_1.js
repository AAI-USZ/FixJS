function() {
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
            }