function (size, initFun) {
        var res = [];
        var i = size;
        while (i > 0) {
            res[--i] = initFun(i);
        }
        return res;
    }