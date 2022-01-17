function extract(bag, key, def) {
        if (!key) {
            return bag || {};
        }

        var keys = key.split('.'),
            cur = bag,
            i;

        for (i = 0; i < keys.length; i += 1) {
            if (cur[keys[i]]) {
                cur = cur[keys[i]];
            } else {
                return def;
            }
        }

        return cur;
    }