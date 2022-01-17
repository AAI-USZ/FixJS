function () {
        var result = fluid.model.transform.arrayValue(source, {
            path: "cat"
        });
        
        jqUnit.assertDeepEq("arrayValue() should box a non-array value up as one.", 
                            [source.cat], result);
                            
        result = fluid.model.transform.arrayValue(source, {
            path: "sheep"
        });
        
        jqUnit.assertDeepEq("arrayValue() should not box up an array value.", 
                            source.sheep, result);
    }