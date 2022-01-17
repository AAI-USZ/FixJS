function plus(args) {        
        argsCheck(2, args.length, '+');

        var left = args[0],
            right = args[1];

        typeCheck('number', left.type, '+', 'first argument');
        typeCheck('number', right.type, '+', 'second argument');
 
        return Data.Number(left.value + right.value);
    }