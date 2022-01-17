function(obj) {
        var sources = Array.prototype.slice.call(arguments, 1),
            i, length, source, prop;
        for(i = 0, length = sources.length; i < length; i++) {
            source = sources[i];
            for (prop in source) {
                obj[prop] = source[prop];
            }
        }
        return obj;
    }