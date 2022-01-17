function (Data) {
    "use strict";


    function FunctionError(type, expected, actual, fname, message) {
        this.type = type;
        this.expected = expected;
        this.actual = actual;
        this.fname = fname;
        this.message = message;
    }

    FunctionError.prototype.toString = function() {
        return this.type + " in " + this.fname + ": " + this.message + 
               ", expected " + this.expected + " but got " + this.actual;
    };


    function typeCheck(expected, actual, fname, message) {
        if (expected !== actual) {
            throw new FunctionError('TypeError', expected, actual, fname, message);
        }
    }


    function argsCheck(expected, actual, fname, message) {
        if (expected !== actual) {
            throw new FunctionError('NumArgsError', expected, actual, fname, message);
        }
    }

    
    function cons(args) {        
        argsCheck(2, args.length, 'cons');

        var elem = args[0],
            list = args[1];

        typeCheck('list', list.type,  'cons', "second argument");

        var newList = [elem];
        for (var i = 0; i < list.value.length; i++) {
            newList.push(list.value[i]);
        }

        return Data.List(newList);
    };


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


    function list(args) {
        return Data.List(args);
    }


    function equalsList(lval, rval) {
        var i, compare;
        if (lval.length !== rval.length) {
            return Data.Boolean(false);
        }

        for (i = 0; i < lval.length; i++) {
            // first we check the types ...
            if (lval[i].type !== rval[i].type) {
                return Data.Boolean(false);
            }
            // ... and continue to the values ...
            compare = equals([lval[i], rval[i]]);
            if (compare.type === 'nil' || !compare.value) {
                return Data.Boolean(false);
            };
        }
        // ... base case, no differences found:  equal
        return Data.Boolean(true);
    }


    function equals(args) {
        var left = args[0],
            right = args[1];
        
        if (args.length !== 2) {
            throw new Error("wrong number of arguments: needed 2, got " + args.length);
        }

        var ltype = left.type,
            rtype = right.type,
            lval = left.value,
            rval = right.value;

        if (ltype !== rtype) {
            return Data.Nil();
        }

        if (ltype === 'function' || ltype === 'specialform' || ltype === 'nil') {
            return Data.Nil();
        }

        // should a 'nil' in a list cause the comparison to return a 'nil'?
        // for now, we'll say ... no
        if (ltype === 'list') {
            return equalsList(lval, rval);
        }

        if (ltype === 'number' || ltype === 'string' || ltype === 'symbol' || ltype === 'boolean') {
            return Data.Boolean(lval === rval);
        }

        throw new Error("unrecognized type: " + ltype);
    }


    function plus(args) {
        var left = args[0],
            right = args[1];
        
        if (args.length != 2) {
            throw new Error("wrong number of arguments: needed 2, got " + args.length);
        }

        if (left.type !== 'number' || right.type !== 'number') {
            throw new Error("primitive + requires two numbers (got " + left.type + ", " + right.type + ")");
        }
        return Data.Number(left.value + right.value);
    }


    function neg(args) {
        var num = args[0];
        
        if (args.length != 1) {
            throw new Error("wrong number of arguments: needed 1, got " + args.length);
        }

        if (num.type !== 'number') {
            throw new Error("primitive 'neg' requires a number (got " + num.type + ")");
        }
        return Data.Number(-num.value);
    }


    return {
        'cons': cons,
        'car': car,
        'cdr': cdr,
        'list': list,
        '=': equals,
        '+': plus,
        'neg': neg
    };

}