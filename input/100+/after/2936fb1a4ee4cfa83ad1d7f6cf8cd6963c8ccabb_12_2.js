function (ppList, target, priority, paused) {
        var listElement = new cc.ListEntry(null, null, target, priority, paused, false);

        // empey list ?
        if (!ppList) {
            ppList = [];
            ppList.push(listElement);
        } else {
            var added = false;
            for (var i = 0; i < ppList.length; i++) {
                if (priority < ppList[i].priority) {
                    ppList = cc.ArrayAppendObjectToIndex(ppList, listElement, i);
                    added = true;
                    break;
                }
            }

            // Not added? priority has the higher value. Append it.
            if (!added) {
                ppList.push(listElement);
            }
        }

        //update hash entry for quick access
        var hashElement = new cc.HashUpdateEntry(ppList, listElement, target, null);
        this._hashForUpdates.push(hashElement);
    }