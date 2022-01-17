function cdr(args) {         
        argsCheck(1, args.length, 'cdr');
        
        var list = args[0];
        
        typeCheck('list', list.type, 'cdr', 'only argument');
    
        if (list.value.length === 0) {
            throw new FunctionError("ValueError", 'non-empty list', 'list', 
                  'cdr', "cannot take cdr of empty list");
        }
        
        return Data.List(list.value.slice(1));
    }