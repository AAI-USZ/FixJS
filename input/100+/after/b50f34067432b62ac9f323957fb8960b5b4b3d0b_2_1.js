function (val, idx) {
        if (type in {'boolean':1, 'bool':1}) {
            if ((!val) || (val in {'0':1, 'no':1, 'false':1})) {
                val = false;
            } else {
                val = true;
            }
        } else if (type in {'integer':1, 'int':1}) {
            val = parseInt(val, 10);
        } else if (type === 'str') {
            val = String(val);
        } else if (type === 'func') {
            if (!val) {
                val = function () {};
            }
        }
        if (typeof idx !== 'undefined') {
            cfg[v][idx] = val;
        } else {
            cfg[v] = val;
        }
    }