function cdr(args) {         
        argsCheck(1, args.length, 'cdr');
        
        var list = args[0], 
            rest;
        
        if(!(list.type === 'list' || list.type === 'string')) {
            throw new FunctionError('TypeError', 'string/list', list.type, 'cdr', "only argument");
        } 
   
        if (list.value.length === 0) {
            throw new FunctionError("ValueError", 'non-empty', 'empty', 
                  'cdr', "cannot take cdr of empty list/string");
        }
        
        rest = list.value.slice(1);
        if (list.type === 'list') {
            return Data.List(rest);
        } else { // it's a string
            return Data.String(rest);
        }
    }