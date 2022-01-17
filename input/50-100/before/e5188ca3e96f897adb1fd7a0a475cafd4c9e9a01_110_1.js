function(name, value)
    {
        var options = [
            "showUserProps",
            "showUserFuncs",
            "showDOMProps",
            "showDOMFuncs",
            "showDOMConstants",
            "showInlineEventHandlers",
            "showOwnProperties",
            "showEnumerableProperties"
        ];

        var isRefreshOption = function(element) { return element == name; };
        if (options.some(isRefreshOption))
            this.rebuild(true);
    }