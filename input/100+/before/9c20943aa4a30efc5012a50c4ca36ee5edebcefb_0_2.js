function(errorCode, entries)
    {
        if (errorCode === FileError.NOT_FOUND_ERR) {
            if (this.parent !== this.treeOutline)
                this.parent.refresh();
            return;
        }

        if (errorCode !== 0 || !entries) {
            console.error("Failed to read directory: " + errorCode);
            return;
        }

        entries.sort(WebInspector.FileSystemModel.Entry.compare);
        if (this._view)
            this._view.showEntries(entries);

        var oldChildren = this.children.slice(0);

        var newEntryIndex = 0;
        var oldChildIndex = 0;
        var currentTreeItem = 0;
        while (newEntryIndex < entries.length && oldChildIndex < oldChildren.length) {
            var newEntry = entries[newEntryIndex];
            var oldChild = oldChildren[oldChildIndex];
            var order = newEntry.name.localeCompare(oldChild._entry.name);

            if (order === 0) {
                if (oldChild._entry.isDirectory && oldChild.expanded)
                    oldChild.refresh();
                ++newEntryIndex;
                ++oldChildIndex;
                ++currentTreeItem;
                continue;
            }
            if (order < 0) {
                this.insertChild(new WebInspector.FileSystemView.EntryTreeElement(this._fileSystemView, newEntry), currentTreeItem);
                ++newEntryIndex;
                ++currentTreeItem;
                continue;
            }

            this.removeChildAtIndex(currentTreeItem);
            ++oldChildIndex;
        }
        for (; newEntryIndex < entries.length; ++newEntryIndex)
            this.appendChild(new WebInspector.FileSystemView.EntryTreeElement(this._fileSystemView, entries[newEntryIndex]));

        for (; oldChildIndex < oldChildren.length; ++oldChildIndex)
            this.removeChild(oldChildren[oldChildIndex]);
    }