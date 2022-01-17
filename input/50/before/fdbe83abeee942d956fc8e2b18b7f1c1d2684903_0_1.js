function(err) {
                        if (err) {
                            jqUnit.assertFalse("Got an error on login:" + err.message, true);
                            jqUnit.start();
                        }
                        fluid.log("Connection to the server was closed");
                    }