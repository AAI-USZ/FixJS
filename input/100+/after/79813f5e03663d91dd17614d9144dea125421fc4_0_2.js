function keys(obj) {
        var key, list = [];
        for (key in obj) {
            list.push(key);
        }
        return list;
    }