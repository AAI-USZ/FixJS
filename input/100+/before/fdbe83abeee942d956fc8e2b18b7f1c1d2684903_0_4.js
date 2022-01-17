function() {
                        fluid.log("Logout connection to server ended");
                        jqUnit.assertNotEquals("Successful logout message returned", data.indexOf("successfully logged out."), -1);
                        //After successful logout, get settings and check that they have been properly reset
                        //fluid.log("ORIG VALS "+JSON.stringify(originalValues));
                        fluid.each(originalValues[token].environments.gnome, function (testBlock, textIndex) {
                            var args = {};
                            args[token] = testBlock.data;
                            //wait one second to ensure that the settings have propagated
                            setTimeout(function() {
                                //call the settingshandler to get the settings
                                var changedSettings = fluid.invokeGlobalFunction(testBlock.type, [args]);
                                //go through each of the settings to compare them:
                                fluid.each(changedSettings[token], function (arrayEntry, arrayInd) {
                                    //check each setting:
                                    fluid.each(arrayEntry.settings, function (settingValue, settingKey) {
                                        var expectedValue = testBlock.data[arrayInd].settings[settingKey];
                                        jqUnit.assertEquals("Check setting "+settingKey, expectedValue, settingValue);
                                    });
                                });
                                jqUnit.start(); 
                            }, 1000);
                        });
                    }