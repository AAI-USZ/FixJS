function() {
        var type = funcs['prim-type'];

        deepEqual(str("number"), type([num(14)]), "'prim-type' is a function of one argument");
        
        deepEqual(str("list"), type([list([])]), "it returns the type of its argument as a string");
        
        expectException(function() {
            type([]);
        }, 'NumArgsError', 'too few arguments throws an exception ...');
        
        expectException(function() {
            type([num(5), num(8)]);
        }, 'NumArgsError', 'as does too many arguments');
        
    }