function (inputPath, value, expander) {
        var togo;
        if (inputPath) { // NB: We may one day want to reverse the crazy jQuery-like convention that "no path means root path"
            togo = fluid.get(expander.source, inputPath);
        }
        if (togo === undefined) {
            togo = fluid.isPrimitive(value) ? value : expander.expand(value);
        }
        return togo;
    }