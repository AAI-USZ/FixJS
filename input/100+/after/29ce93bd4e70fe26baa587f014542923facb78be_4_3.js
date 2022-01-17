function() {
        var da = funcs['data'],
            con1 = da([str("obj")]),
            ut = funcs['udt-type'],
            uv = funcs['udt-value'],
            obj1 = con1.value([num(39)]);

        deepEqual(
            "function", 
            con1.type, 
            "'data' creates user-defined types, taking one string argument and returning a constructor function"
        );
        
        deepEqual(
            data.UserDefined(str("obj"), num(39)), 
            obj1, 
            "constructors take one argument, and return an object with the appropriate type"
        );

        expectException(function() {
            da([num(4)]);
        }, 'TypeError', "remember to give 'data' a string");
        
        expectException(function() {
            da([]);
        }, 'NumArgsError', 'too few args: exception');
        
        expectException(function() {
            da([str("abc"), str("def")]);
        }, 'NumArgsError', 'too many: exception');
        
        
        deepEqual(str("obj"), ut([obj1]), "udt-type returns the type (as a string) of a user-defined datatype");
        
        expectException(function() {
            ut([num(13)]);
        }, 'TypeError', "udt-type only works on user-defined types");
        
        
        deepEqual(num(39), uv([obj1]), "'udt-value' returns the value of a user-defined datatype");
        
        expectException(function() {
            uv([num(13)]);
        }, 'TypeError', "'udt-value' also only works on user-defined types");
    }