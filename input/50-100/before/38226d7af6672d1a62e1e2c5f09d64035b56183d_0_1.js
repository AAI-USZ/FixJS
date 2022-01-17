function() {
                        fluid.log("Logout connection to server ended");
                        jqUnit.assertNotEquals("Successful logout message returned", data.indexOf("successfully logged out."), -1);
                        //After successful logout, get settings and check that they have been properly reset
                        setTimeout(function () {
                            checkSettings(json.initialState);
                            jqUnit.start();
                        }, 5000);
                    }