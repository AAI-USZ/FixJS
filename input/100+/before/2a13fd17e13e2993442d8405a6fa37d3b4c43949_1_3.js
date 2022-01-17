function equals(left, right) {
        if (arguments.length != 2) {
            throw new Error("wrong number of arguments: needed 2, got " + arguments.length);
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