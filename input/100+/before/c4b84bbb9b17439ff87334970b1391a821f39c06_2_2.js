function(event)
    {
        var resource = /** @type {WebInspector.Resource} */ event.data.resource;
        var resourceItem = this._resourceItems.get(resource);
        if (!resourceItem) {
            resourceItem = this._createResourceItem(resource);
            return;
        }

        var historyLength = resource.history.length;
        var historyItem = new WebInspector.RevisionHistoryTreeElement(resource.history[historyLength - 1], resource.history[historyLength - 2], false);
        if (resourceItem.children.length)
            resourceItem.children[0].allowRevert();
        resourceItem.insertChild(historyItem, 0);
    }