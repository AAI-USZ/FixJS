function car(list) {
        if (list.type !== 'list') {
            throw new Error("argument to 'car' must be list (got " + list.type + ")");
        }
        if (arguments.length != 1) {
            throw new Error("wrong number of arguments: needed 1, got " + arguments.length);
        }

        if (list.value.length > 0) {
            return list.value[0];
        }

        return Data.Nil();
    }