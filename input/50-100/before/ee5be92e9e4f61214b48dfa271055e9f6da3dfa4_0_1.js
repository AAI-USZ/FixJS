function reifySymbol(sexpr) {
        if (value = sexpr.value.match(INTEGER)) {
            return Data.Number(Number(value[0]));
        }

        if (value = sexpr.value.match(FLOAT)) {
            return Data.Number(Number(value[0]));
        }

        if (sexpr.value.length > 0) {
            return Data.Symbol(sexpr.value);
        }

        // empty string is an error
        throw new Error("can't extract primitive:  symbol has empty value");
    }