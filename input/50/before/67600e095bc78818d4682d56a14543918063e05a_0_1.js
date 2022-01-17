function()
    {
        var resources = [];
        function pushResourceData(resource)
        {
            resources.push(this._makeResource(resource));
        }
        WebInspector.resourceTreeModel.forAllResources(pushResourceData.bind(this));
        return resources;
    }