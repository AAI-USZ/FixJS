function(name, value)
    {
        var options = new Set();
        options.add("showUserProps");
        options.add("showUserFuncs");
        options.add("showDOMProps");
        options.add("showDOMFuncs");
        options.add("showDOMConstants");
        options.add("showInlineEventHandlers");
        options.add("showOwnProperties");
        options.add("showEnumerableProperties");

        if (options.has(name))
            this.rebuild(true);
    }