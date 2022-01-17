function eval(exp) {
        if (types.is_list(exp)) {
            return rt.exec(exp);
        } else if (types.is_symbol(exp)) {
            for (var i = rt.scope.length - 1; i >= 0; i--) {
                if (rt.scope[i][exp.value]) return rt.scope[i][exp.value];
            }
            throw "name " + exp.value + " is undefined";
        } else return exp;
    }