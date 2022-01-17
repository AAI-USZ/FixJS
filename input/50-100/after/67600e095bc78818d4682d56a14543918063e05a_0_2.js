function()
    {
        var resources = {};

        function pushResourceData(contentProvider)
        {
            if (!resources[contentProvider.contentURL()])
                resources[contentProvider.contentURL()] = this._makeResource(contentProvider);
        }
        WebInspector.workspace.uiSourceCodes().forEach(pushResourceData.bind(this));
        WebInspector.resourceTreeModel.forAllResources(pushResourceData.bind(this));
        return Object.values(resources);
    }