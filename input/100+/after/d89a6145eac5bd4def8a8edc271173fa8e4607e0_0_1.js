function (handlerBlock, handlerIndex) {
            //first get the settings from the system
            var args = {};
            args.checking = handlerBlock.data;
            var response = fluid.invokeGlobalFunction(handlerBlock.type, [args]);
            //check that these corresponds to the one we anted to set:s
            jqUnit.assertDeepEq("Settings should match: " + description, handlerBlock.data, response.checking);
        }