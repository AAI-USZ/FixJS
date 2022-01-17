function (func, timeMs, args) {
        var funcAsync;

        if (!(func instanceof Function || typeof func === 'string' || func instanceof String)) {
            throw "Wrong use of WebPage#evaluateAsync";
        }
        funcAsync = "function() { setTimeout(" + func.toString() + ", " + timeMs + "); }";

        this.evaluate(funcAsync, arguments);
    }