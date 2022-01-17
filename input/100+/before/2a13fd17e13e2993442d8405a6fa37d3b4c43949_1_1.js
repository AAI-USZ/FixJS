function cons(elem, list) {
        if (list.type !== 'list') {
            throw new Error("second arguments to 'cons' must be list (got " + list.type + ")");
        }
        if (arguments.length != 2) {
            throw new Error("wrong number of arguments: needed 2, got " + arguments.length);
        }

        var newList = [elem];
        for (var i = 0; i < list.value.length; i++) {
            newList.push(list.value[i]);
        }

        return Data.List(newList);
    }