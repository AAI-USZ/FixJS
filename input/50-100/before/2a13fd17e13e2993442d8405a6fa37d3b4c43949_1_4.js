function neg(num) {
        if (arguments.length != 1) {
            throw new Error("wrong number of arguments: needed 1, got " + arguments.length);
        }

        if (num.type !== 'number') {
            throw new Error("primitive 'neg' requires a number (got " + num.type + ")");
        }
        return Data.Number(-num.value);
    }