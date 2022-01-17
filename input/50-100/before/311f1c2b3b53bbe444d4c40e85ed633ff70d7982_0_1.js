function(key) {
            var keys = key.split('.'),
                pt = this.__attributes;

            _.each(keys, function(key) {
                if (pt === undefined) {
                    return null;
                }
                pt = pt[key];
            });
            return pt;
        }