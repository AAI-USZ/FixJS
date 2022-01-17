function(resource)
    {
        var resourceItem = new TreeElement(resource.displayName, null, true);
        resourceItem.selectable = false;

        // Insert in sorted order
        for (var i = 0; i < this._treeOutline.children.length; ++i) {
            if (this._treeOutline.children[i].title.localeCompare(resource.displayName) > 0) {
                this._treeOutline.insertChild(resourceItem, i);
                break;
            }
        }
        if (i === this._treeOutline.children.length)
            this._treeOutline.appendChild(resourceItem);

        this._resourceItems.put(resource, resourceItem);

        var revisionCount = resource.history.length;
        for (var i = revisionCount - 1; i >= 0; --i) {
            var revision = resource.history[i];
            var historyItem = new WebInspector.RevisionHistoryTreeElement(revision, resource.history[i - 1], i !== revisionCount - 1);
            resourceItem.appendChild(historyItem);
        }

        var linkItem = new TreeElement("", null, false);
        linkItem.selectable = false;
        resourceItem.appendChild(linkItem);

        var revertToOriginal = linkItem.listItemElement.createChild("span", "revision-history-link revision-history-link-row");
        revertToOriginal.textContent = WebInspector.UIString("apply original content");
        revertToOriginal.addEventListener("click", resource.revertToOriginal.bind(resource));

        var clearHistoryElement = resourceItem.listItemElement.createChild("span", "revision-history-link");
        clearHistoryElement.textContent = WebInspector.UIString("revert");
        clearHistoryElement.addEventListener("click", this._clearHistory.bind(this, resource));
        return resourceItem;
    }