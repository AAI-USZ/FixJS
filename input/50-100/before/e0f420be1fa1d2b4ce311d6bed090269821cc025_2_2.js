function nullQ(args) {
        argsCheck(1, args.length, 'null?');
        
        var list = args[0];
        
        typeCheck('list', list.type, 'null?', 'only argument');
        
        return Data.Boolean(list.value.length === 0);
    }