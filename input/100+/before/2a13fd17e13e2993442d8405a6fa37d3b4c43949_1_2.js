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
            compare = equals(lval[i], rval[i]);
            if (compare.type === 'nil' || !compare.value) {
                return Data.Boolean(false);
            };
        }
        // ... base case, no differences found:  equal
        return Data.Boolean(true);
    }