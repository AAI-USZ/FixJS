function (bare_jid, resource) {
            // Removes the resource for a user and returns the number of 
            // resources left over.
            if (_.has(storage, bare_jid)) {
                var idx = _.indexOf(storage[bare_jid], resource);
                if (idx !== -1) {
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
            return 0;
        }