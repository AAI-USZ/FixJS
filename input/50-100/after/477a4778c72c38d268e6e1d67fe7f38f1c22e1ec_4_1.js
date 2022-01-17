function () {
        var shortened = fluid.model.transform(valueTests, transformToShortNames, {isomorphic: true});
        var expected = fluid.transform(valueTests, function(config) {
             return {
                 expander: {
                     type: fluid.computeNickName(config.expander.type)
                 }
             };
        });
        jqUnit.assertDeepEq("Transformed expander types to short names", expected, shortened);
        var newConfig = $.extend(true, [], valueTests, shortened);
        testOneStructure(newConfig);
    }