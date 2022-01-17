function (arrayEntry, arrayInd) {
                                    //check each setting:
                                    fluid.each(arrayEntry.settings, function (settingValue, settingKey) {
                                        var expectedValue = testBlock.data[arrayInd].settings[settingKey];
                                        jqUnit.assertEquals("Check setting "+settingKey, expectedValue, settingValue);
                                    });
                                }