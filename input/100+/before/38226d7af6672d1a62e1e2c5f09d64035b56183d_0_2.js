function() {
                        fluid.log("Connection to server ended");
                        jqUnit.assertNotEquals("Successful login message returned", data.indexOf("User was successfully logged in."), -1);
                        setTimeout(function() {
                            checkSettings(json.loggedInState);
                            jqUnit.start();
                        }, 5000);
                    }