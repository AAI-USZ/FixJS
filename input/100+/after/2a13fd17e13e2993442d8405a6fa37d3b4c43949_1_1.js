function (Data) {
    "use strict";

    
    function cons(args) {
    	var elem = args[0],
    	    list = args[1];
    	
        if (list.type !== 'list') {
            throw new Error("second arguments to 'cons' must be list (got " + list.type + ")");
        }
        
        if (args.length != 2) {
            throw new Error("wrong number of arguments: needed 2, got " + args.length);
        }

        var newList = [elem];
        for (var i = 0; i < list.value.length; i++) {
            newList.push(list.value[i]);
        }

        return Data.List(newList);
    };


    function car(args) {
    	var list = args[0];
    	
        if (list.type !== 'list') {
            throw new Error("argument to 'car' must be list (got " + list.type + ")");
        }
        
        if (arguments.length != 1) {
            throw new Error("wrong number of arguments: needed 1, got " + args.length);
        }

        if (list.value.length > 0) {
            return list.value[0];
        }

        return Data.Nil();
    }


    function cdr(args) {    
    	var list = args[0];
    	
        if (list.type !== 'list') {
            throw new Error("argument to 'cdr' must be list (got " + list.type + ")");
        }
        
        if (arguments.length != 1) {
            throw new Error("wrong number of arguments: needed 1, got " + args.length);
        }

        if (list.value.length > 0) {
            return Data.List(list.value.slice(1));
        }

        return Data.Nil();
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
    	
        if (args.length != 2) {
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