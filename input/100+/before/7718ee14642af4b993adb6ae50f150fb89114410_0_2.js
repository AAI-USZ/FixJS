function (bare_jid, resource) {
            // Removes the resource for a user and returns the number of 
            // resources left over.
            if (Object.prototype.hasOwnProperty.call(storage, bare_jid)) {
                if (resource in helpers.oc(storage[bare_jid])) {
                    var idx = storage[bare_jid].indexOf(resource);
                    if (idx !== undefined) {
                        storage[bare_jid].splice(idx, 1);
                        if (storage[bare_jid].length === 0) {
                            delete storage[bare_jid];
                            return 0;
                        }
                        else {
                            return storage[bare_jid].length;
                        }
                    }
                }
            }
            return 0;
        }