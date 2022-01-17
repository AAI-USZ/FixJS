function clearHistory()
        {
            resource.revertAndClearHistory();
            this._treeOutline.removeChild(resourceItem);
            this._resourceItems.remove(resource);
        }