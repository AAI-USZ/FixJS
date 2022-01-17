function(name, value)
    {
        var options = [
            "onlyShowAppliedStyles",
            "showUserAgentCSS",
            "expandShorthandProps",
            "colorDisplay",
            "showMozillaSpecificStyles"
        ];

        var isRefreshOption = function(element) { return element == name; };
        if (options.some(isRefreshOption))
            this.refresh();
    }