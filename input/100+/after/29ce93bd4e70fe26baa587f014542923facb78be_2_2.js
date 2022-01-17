function data(args) {
        argsCheck(1, args.length, 'data');
        
        var usertype = args[0];
        
        typeCheck('list', usertype.type, 'data', 'only arg');
        
        usertype.value.map(function (c) {
            typeCheck('char', c.type, 'data', 'string (list of chars)');
        });

        function constructor(c_args) {
            argsCheck(1, c_args.length, usertype.value + ' constructor');
            
            return Data.UserDefined(usertype, c_args[0]);
        }
        
        return Data.Function(constructor);
    }