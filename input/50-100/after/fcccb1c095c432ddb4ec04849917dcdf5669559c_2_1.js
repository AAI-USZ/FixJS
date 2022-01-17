function(name, value)
    {
        var options = new Set();
        options.add("onlyShowAppliedStyles");
        options.add("showUserAgentCSS");
        options.add("expandShorthandProps");
        options.add("colorDisplay");
        options.add("showMozillaSpecificStyles");

        if (options.has(name))
            this.refresh();
    }