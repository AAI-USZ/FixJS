function() {
                checkSettings(json.loggedInState, token + " logged in.");
                //test logout:
                addRESTTest(token, "logout", function (data) {
                    jqUnit.assertNotEquals("Successful logout message returned", data.indexOf("successfully logged out."), -1);
                    setTimeout(function() {
                        checkSettings(json.initialState, token + " back to initial state");
                        //let the system know we're ready for another test: 
                        testNextToken();
                        jqUnit.start();
                    }, 1000);
                });
                jqUnit.start();
            }