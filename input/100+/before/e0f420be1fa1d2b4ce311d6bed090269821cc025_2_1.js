function car(args) {
        argsCheck(1, args.length, 'car');

        var list = args[0];
        
        typeCheck('list', list.type, "car", "only argument");
        
        if (list.value.length === 0) {
            throw new FunctionError("ValueError", "non-empty list", "list", 
                  'car', "cannot take car of empty list");
        }
        
        return list.value[0];
    }