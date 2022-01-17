function (param) {
        if(param === undefined) {
            return undefined;
        } else if(param === null) {
            return null;
        } else if(Object.prototype.toString.call(param) === '[object Array]') {
            return _cloneArray(param);
        } else if(typeof param === 'object') {
            return _cloneObj(param);
            // doesn't support regexps yet.
        } else {
            return param;
        }
    }