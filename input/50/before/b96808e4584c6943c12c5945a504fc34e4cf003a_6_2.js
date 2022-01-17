function () {
        var options = fluid.copy(oldOptions);
        options.transformOptions = {
            transformer: "fluid.model.transformWithRules",
            config: transformRules  
        };
        var that = fluid.tests.testTransformable(options);
        checkTransformedOptions(that);
    }