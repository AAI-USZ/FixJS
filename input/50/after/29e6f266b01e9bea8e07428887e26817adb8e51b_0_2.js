function (match, operator, key) {
            // Only `*` operators are supported for key-less matches to allowing
            // in-path wildcards like: '/foo/*'.
            if (!key) {
                return operator === '*' ? '.*' : match;
            }

            keys.push(key);
            return operator === '*' ? '(.*?)' : '([^/\\?\\#]*)';
        }