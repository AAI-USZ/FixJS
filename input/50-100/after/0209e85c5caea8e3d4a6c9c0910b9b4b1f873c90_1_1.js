function (args) {
        var n = args.length;
        var result = new Array(n);
        while (n--) {
            result[n] = args[n];
        }
        return result;
    }