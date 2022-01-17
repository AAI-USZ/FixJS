function cdr(list) {
        if (list.type !== 'list') {
            throw new Error("argument to 'cdr' must be list (got " + list.type + ")");
        }
        if (arguments.length != 1) {
            throw new Error("wrong number of arguments: needed 1, got " + arguments.length);
        }

        if (list.value.length > 0) {
            return Data.List(list.value.slice(1));
        }

        return Data.Nil();
    }