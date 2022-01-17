function plus(left, right) {
        if (arguments.length != 2) {
            throw new Error("wrong number of arguments: needed 2, got " + arguments.length);
        }

        if (left.type !== 'number' || right.type !== 'number') {
            throw new Error("primitive + requires two numbers (got " + left.type + ", " + right.type + ")");
        }
        return Data.Number(left.value + right.value);
    }