function car(args) {
        argsCheck(1, args.length, 'car');

        var list = args[0], fst;

        if(!(list.type === 'list' || list.type === 'string')) {
            throw new FunctionError('TypeError', 'string/list', list.type, 'car', "only argument");
        }
        
        if (list.value.length === 0) {
            throw new FunctionError("ValueError", "non-empty", "empty", 
                  'car', "cannot take car of empty list/string");
        }
        
        fst = list.value[0];
        if(list.type === 'list') {
            return fst;
        } else { // it's a string, so the first is a char
            return Data.Char(fst);
        }
    }