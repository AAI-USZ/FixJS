function numberLessThan(args) {
        argsCheck(2, args.length, 'number-<');
        
        var l = args[0],
            r = args[1];
        
        typeCheck('number', l.type, 'number-<', 'first argument');
        typeCheck('number', r.type, 'number-<', 'second argument');
        
        return Data.Boolean(l.value < r.value);
    }