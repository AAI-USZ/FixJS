function(key, _default) {
            var keys = key.split('.'),
                pt = this.__attributes;

            _.each(keys, function(key) {
                if (pt === undefined) {
                    return _default;
                }
                pt = pt[key];
            });
            return _.isUndefined(pt) || _.isNull(pt) ? _default : pt;
        }