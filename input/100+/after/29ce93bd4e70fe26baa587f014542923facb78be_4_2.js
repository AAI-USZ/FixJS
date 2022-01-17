function() {
        var type = funcs['prim-type'],
            str1 = str('number'),
            str2 = str('list');

        deepEqual(str1, type([num(14)]), "'prim-type' is a function of one argument");
        
        deepEqual(str2, type([list([])]), "it returns the type of its argument as a string");
        
        expectException(function() {
            type([]);
        }, 'NumArgsError', 'too few arguments throws an exception ...');
        
        expectException(function() {
            type([num(5), num(8)]);
        }, 'NumArgsError', 'as does too many arguments');
        
    }