function()
    {
        var path = [];
        for (var i = 0; i < arguments.length; i++) {
            if (arguments[i] != "") path.push(arguments[i]);
        }
        return path.join(this.sep);
    }