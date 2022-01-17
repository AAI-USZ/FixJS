function clone(obj) {
        var res;

        if ("function" === typeof(obj)) {
            res = function() { obj.apply(this, arguments); };
        } else if (Object(obj) === obj) {
            res = new obj.constructor;
        } else {
            return obj;
        }

        for (var key in obj) if (obj[has](key)) {
            res[key] = clone(obj[key]);
        }
        return res;
    }