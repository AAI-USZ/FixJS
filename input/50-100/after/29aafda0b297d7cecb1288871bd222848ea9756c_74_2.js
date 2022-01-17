function(name, value)
    {
        var options = new Set();
        options.add("showUserAgentCSS");
        options.add("computedStylesDisplay");
        options.add("colorDisplay");
        options.add("showMozillaSpecificStyles");

        if (options.has(name))
            this.refresh();
    }