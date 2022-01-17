function cons(args) {        
        argsCheck(2, args.length, 'cons');

        var elem = args[0],
            list = args[1];

        if(!(list.type === 'list' || list.type === 'string')) {
            throw new FunctionError('TypeError', 'string or list', list.type, 'cons', "second argument");
        }

        return list.cons(elem);
    }