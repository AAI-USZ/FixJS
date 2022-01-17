function historyCleared()
        {
            var resourceItem = this._resourceItems.get(resource);
            this._treeOutline.removeChild(resourceItem);
            this._resourceItems.remove(resource);
        }