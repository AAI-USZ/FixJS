function ksort(obj, sort_flags) {
        var keys = Object.keys(obj),
            sorter,
            ret = {},
            i;

        sort_flags = sort_flags || 'string';
        switch (sort_flags) {
        case 'string':
            sorter = function (a, b) {
                return a.strnatcmp(a, b);
            };
        break;
        case 'number':
            sorter = function (a, b) {
                return parseFloat(a) - parseFloat(b);
            };
        break;
        }

        keys.sort(sorter);
        for (i = 0; i < keys.length; i++) {
            ret[keys[i]] = obj[keys[i]];
        }
        return ret;
    }