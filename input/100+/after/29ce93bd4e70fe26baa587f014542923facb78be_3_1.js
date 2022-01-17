function reifySymbol(str) {
        var value;
        
        if (value = str.match(INTEGER)) {
            return Data.Number(Number(value[0]));
        }

        if (value = str.match(FLOAT)) {
            return Data.Number(Number(value[0]));
        }

        if (value = str.match(SYMBOL)) {
            return Data.Symbol(str);
        }

        throw new ReifyError("ValueError", "can't reify symbol from string <" + str + ">");
    }