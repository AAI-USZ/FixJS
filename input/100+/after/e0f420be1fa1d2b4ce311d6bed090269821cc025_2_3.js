function data(args) {
        argsCheck(1, args.length, 'data');
        
        var usertype = args[0];
        
        typeCheck('string', usertype.type, 'data', 'only arg');

        function constructor(c_args) {
            argsCheck(1, c_args.length, usertype.value + ' constructor');
            
            return Data.UserDefined(usertype, c_args[0]);
        }
        
        return Data.Function(constructor);
    }