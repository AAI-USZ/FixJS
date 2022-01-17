function (func, timeMs, args) {
        var args = Array.prototype.splice.call(arguments, 0);

        if (!(func instanceof Function || typeof func === 'string' || func instanceof String)) {
            throw "Wrong use of WebPage#evaluateAsync";
        }
        // Wrapping the "func" argument into a setTimeout
        args.splice(0, 0, "function() { setTimeout(" + func.toString() + ", " + timeMs + "); }");

        this.evaluate.apply(this, args);
    }