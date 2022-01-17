function() {
    	var str = SExpr('string', "yes"),
            emptyString = SExpr('string', "");
    
    	deepEqual(
            list([ch('y'), ch('e'), ch('s')]),
            reify.makePrimitives(str), 
            'strings are reified into lists of chars'
        );
        
        deepEqual(list([]), reify.makePrimitives(emptyString), "an empty string becomes an empty list");
    	
    }