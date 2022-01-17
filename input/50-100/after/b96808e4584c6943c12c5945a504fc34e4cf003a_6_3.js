function () {
        var ruleA = {
            kitten: "cat"
        };
        
        var ruleB = {
            sirius: "kitten"
        };
        
        var expected = {
            sirius: "meow"
        };
        
        var result = fluid.model.transform.sequence(source, [ruleA, ruleB]);
        jqUnit.assertDeepEq("An array of rules should cause each to be applied in sequence.", expected, result);
    }