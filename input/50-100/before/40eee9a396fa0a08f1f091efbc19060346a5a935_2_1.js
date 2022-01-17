function(target) {
        var objs = arguments, l = objs.length, o, copy;
        if (l == 1) {
            objs[1] = target;
            l = 2;
            target = this;
        }
        for (var i = 1; i < l; i++) {
            o = objs[i];
            for (var n in o) {
                copy = o[n];
                target[n] = copy;
            }
        }
        return target;
    }