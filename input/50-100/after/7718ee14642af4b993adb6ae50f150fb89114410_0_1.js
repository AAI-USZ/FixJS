function (bare_jid, resource) {
            if (Object.prototype.hasOwnProperty.call(storage, bare_jid)) {
                if (_.indexOf(storage[bare_jid], resource) == -1) {
                    storage[bare_jid].push(resource);
                }
            } else  {
                storage[bare_jid] = [resource];
            }
        }