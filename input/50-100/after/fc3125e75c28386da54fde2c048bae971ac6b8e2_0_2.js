function (key, value, options) {
        if (typeof key === 'string') {
            return arguments.length === 1 ?
                Cookies.get(key) : Cookies.set(key, value, options);
        } else if (typeof key === 'object' && object !== null) {
            return Cookies.set(key, value, options);
        }
    }