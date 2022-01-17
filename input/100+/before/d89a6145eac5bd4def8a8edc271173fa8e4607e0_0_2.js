function (expected) {
        //go through each of the settings
        fluid.each(expected, function (handlerBlock, handlerIndex) {
            //first get the settings from the system
            var args = {};
            args.checking = handlerBlock.data;
            var response = fluid.invokeGlobalFunction(handlerBlock.type, [args]);
            //check that these corresponds to the one we anted to set:
            fluid.each(handlerBlock.data, function (solutionBlock, solutionIndex) {
                //check each setting:
                fluid.each(solutionBlock.settings, function (expectedValue, settingKey) {
                    var responseValue = response.checking[solutionIndex].settings[settingKey];
                    jqUnit.assertEquals("Check setting "+settingKey, expectedValue, responseValue);
                });
            });
        });
    }