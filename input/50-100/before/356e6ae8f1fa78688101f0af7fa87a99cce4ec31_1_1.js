function(obj) {
        var sources = Array.prototype.slice.call(arguments, 1);
        for(var i=0; i<sources.length; i++) {
            var source = sources[i];
            for (var prop in source) {
                obj[prop] = source[prop];
            }
        }
        return obj;
    }