function eqQ(args) {        
        argsCheck(2, args.length, 'eq?');

        var left = args[0],
            right = args[1];

        var ltype = left.type,
            rtype = right.type,
            lval = left.value,
            rval = right.value;

        if (ltype !== rtype) {
            throw new FunctionError('TypeError', ltype, rtype, "eq?", "arguments must have identical types")
        }

        if (ltype === 'number' || ltype === 'char' || ltype === 'symbol' || ltype === 'boolean') {
            return Data.Boolean(lval === rval);
        }

        throw new FunctionError('TypeError', 'number/char/symbol/boolean', 
                  ltype, "eq?", "can't compare type");
    }