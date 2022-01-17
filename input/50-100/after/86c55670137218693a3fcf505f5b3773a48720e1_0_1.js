function() {
        var data = localStorage.getItem(localStorageKey)
          , key;

        if (data === null) {
            return;
        }

        try {
            data = JSON.parse(data)
        } catch(err) {
            return;
        }

        for (key in data) {
            if (data.hasOwnProperty(key) && !httpCache.utils.isStale(data[key])) {
                set(key, data[key]);
            }
        }
    }