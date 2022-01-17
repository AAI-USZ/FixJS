function (inputs, output, options) {
        var that = flock.ugen(inputs, output, options);
        if (that.options.buffer) {
            that.output = that.options.buffer;
        }
        that.gen = function () {}; // No op function--we just pass the output buffer back as-is.
        return that;
    }