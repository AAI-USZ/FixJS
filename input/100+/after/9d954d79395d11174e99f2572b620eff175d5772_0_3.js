function()
    {
        if (!window.localStorage)
            return;

        var url = this.contentURL();
        if (url.startsWith("inspector://"))
            return;

        var loaderId = WebInspector.resourceTreeModel.mainFrame.loaderId;
        var timestamp = this.timestamp.getTime();
        var key = "revision-history|" + url + "|" + loaderId + "|" + timestamp;

        var registry = WebInspector.Revision._revisionHistoryRegistry();

        var historyItems = registry[url];
        if (!historyItems) {
            historyItems = [];
            registry[url] = historyItems;
        }
        historyItems.push({url: url, loaderId: loaderId, timestamp: timestamp, key: key});

        function persist()
        {
            window.localStorage[key] = this._content;
            window.localStorage["revision-history"] = JSON.stringify(registry);
        }

        // Schedule async storage.
        setTimeout(persist.bind(this), 0);
    }