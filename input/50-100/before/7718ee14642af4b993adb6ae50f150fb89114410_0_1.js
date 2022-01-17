function (bare_jid, resource) {
            if (Object.prototype.hasOwnProperty.call(storage, bare_jid)) {
                if (!(resource in helpers.oc(storage[bare_jid]))) {
                    storage[bare_jid].push(resource);
                }
            } else  {
                storage[bare_jid] = [resource];
            }
        }