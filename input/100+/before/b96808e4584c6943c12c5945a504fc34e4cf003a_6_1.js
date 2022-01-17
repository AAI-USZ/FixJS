function () {        
        // Merge to simple objects via EL paths.
        var result = fluid.model.transform.merge(source, {
            left: "hamster",
            right: "cow"
        });
        
        var expected = {
            wheel: source.hamster.wheel,
            grass: source.cow.grass
        };
        
        jqUnit.assertDeepEq("Objects should be correctly merged.", expected, result);
        jqUnit.assertDeepEq("The source object should be unchanged after merging.", cleanSource, source);
        
        // Merging a non-object property should return the left-hand side.                            
        result = fluid.model.transform.merge(source, {
            left: "hamster",
            right: "cat"
        });
        jqUnit.assertEquals("If a non-object property is used to merge, the left hand side value should be returned.",
                            source.hamster, result);
                            
        // Merge two objects, one specified by an EL path and other by a sub-rules object.
        result = fluid.model.transform.merge(source, {
            left: "hamster",
            right: {
                guppy: {
                    expander: {
                        type: "fluid.model.transform.value",
                        path: "cow.grass"
                    }
                },
                minnow: {
                    expander: {
                        type: "fluid.model.transform.value",
                        path: "sheep.1"
                    }
                }
            }
        }, fluid.model.transformWithRules);
        expected = {
            wheel: source.hamster.wheel,
            guppy: source.cow.grass,
            minnow: source.sheep[1]
        };
        jqUnit.assertDeepEq("", expected, result);
  
    }