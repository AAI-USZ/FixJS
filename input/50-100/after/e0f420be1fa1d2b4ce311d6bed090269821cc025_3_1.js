function() {
        var str1 = SExpr('string', "yes"),
            emptyString = SExpr('string', "");
    
        deepEqual(
            str('yes'),
            reify.makePrimitives(str1), 
            'strings are reified into lists of chars'
        );
        
        deepEqual(str(""), reify.makePrimitives(emptyString), "empty string: still empty");
    	
    }