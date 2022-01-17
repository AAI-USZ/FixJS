function(content, timestamp, restoringHistory)
    {
        if (this.history.length) {
            var lastRevision = this.history[this.history.length - 1];
            if (lastRevision._content === content)
                return;
        }
        var revision = new WebInspector.Revision(this, content, timestamp || new Date());
        this.history.push(revision);

        this.dispatchEventToListeners(WebInspector.Resource.Events.RevisionAdded, revision);
        if (!restoringHistory)
            revision._persist();
        WebInspector.resourceTreeModel.dispatchEventToListeners(WebInspector.ResourceTreeModel.EventTypes.ResourceContentCommitted, { resource: this, content: content });
    }