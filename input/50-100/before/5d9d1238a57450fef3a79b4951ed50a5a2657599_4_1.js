function(x)
    {
        var body = document.body;
        if (x)
            body.addStyleClass("compact");
        else
            body.removeStyleClass("compact");

        // This may be called before doLoadedDone, hence the bulk of inspector objects may
        // not be created yet.
        if (WebInspector.toolbar)
            WebInspector.toolbar.compact = x;

        if (WebInspector.searchController)
            WebInspector.searchController.updateSearchLabel();

        if (WebInspector.drawer)
            WebInspector.drawer.resize();
    }