function(error, mainFramePayload)
    {
        if (error) {
            console.error(JSON.stringify(error));
            return;
        }

        this.dispatchEventToListeners(WebInspector.ResourceTreeModel.EventTypes.WillLoadCachedResources);
        WebInspector.inspectedPageURL = mainFramePayload.frame.url;
        this._addFramesRecursively(null, mainFramePayload);
        this._dispatchInspectedURLChanged();
        this.dispatchEventToListeners(WebInspector.ResourceTreeModel.EventTypes.CachedResourcesLoaded);
        this._cachedResourcesProcessed = true;
    }