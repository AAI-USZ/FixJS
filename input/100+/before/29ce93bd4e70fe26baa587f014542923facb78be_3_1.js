function makePrimitives(sexpr) {
        var i, value, elems;

        if (sexpr.type === 'list') {
            elems = sexpr.value.map(function(s) {
                return makePrimitives(s);
            });

            return Data.List(elems);
        }

        if (sexpr.type === "string") {
            return Data.String(sexpr.value);
        }

        if (sexpr.type === 'symbol') {
            return reifySymbol(sexpr);
        }

        throw new Error("unrecognized s-expression type: " + sexpr.type);
    }