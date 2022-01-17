function(err, obj) {
        if (err) {
            stats.getErrors++;
            // ToDo: log something?
            callback(err);
            return;
        }

        // check if we have retrieved something or it missed the cache
        if (!obj) {
            stats.misses++;
            // ToDo: log something?
            callback(null, null);
            return;
        }

        console.log('obj=', obj);
        console.log('obj=', obj.isExpired);
        console.log('obj=', obj.createdAt);

        // we found an object, now check if it _is_ expired or it _should_ be expired
        var isExpired = obj.isExpired() || ( params.expireIf && params.expireIf(obj) );
        if ( isExpired ) {
            stats.expiredMisses++;
            // ToDo: log the result

            // if we don't have a busy lock, finish up now
            if ( !params.busyLock) {
                callback(null, null);
                return;
            }

            // set a new 'temporary' expiration time
            var nowFromEpoch = dateAsEpoch(new Date());
            var busyLockTime = nowFromEpoch + params.busyLock;
            obj.setEarlyExpiresAt(busyLockTime);
            obj.setExpiresAt(busyLockTime);
            self.setObject(key, obj, function(err, obj) {
                if (err) {
                    stats.setObjectErrors++;
                    callback(err);
                    return;
                }

                // callback without any data, since we want the caller to regenerate this key
                callback(null, null);
            });
        }

        // not expired, so return it
        stats.hits++;
        // self.logGetResult('HIT', key, elapsedTime);

        // this value will already be de-serialised, so just return it
        callback(null, obj.value());
    }