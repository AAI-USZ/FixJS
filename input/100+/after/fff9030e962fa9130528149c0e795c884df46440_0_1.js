function(data) {
        for (var url in data) {
            var updates = data[url];

            var attrChanges = {}
            var removals = {};
            var deletions = new Array();
            var additions = {};
            for (var i = 0; i < updates.length; i += 1) {
                var update = updates[i][1];
                if (update['event'] === 'change')
                    attrChanges[update['name']] = update['value'];
                else if (update['event'] === 'remove')
                    removals[update['name']] = update['url'];
                else if (update['event'] === 'delete')
                    deletions.push(update['url']);
                else if (update['event'] === 'add')
                    additions[update['name']] = update['url'];
                else
                    console.warn("Unsupported update type %s", update['event']);
            }
            var records = this._byUrl.massoc(url);
            records.forEach(function(rec) {
                this._syncRecord(rec, attrChanges);
            }.bind(this));

            // remove records entries
            if (removals)
                this._removeRecords(removals);
            // remove deleted elements from the subscription list
            if (deletions)
                this._deleteSubscriptions(deletions);
            // handle addition of new items
            if (additions)
                this._addRecords(additions);

        }
    }