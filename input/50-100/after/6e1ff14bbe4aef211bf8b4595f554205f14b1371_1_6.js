function forOwn(obj, fn, thisObj){
        var key, i = 0;

        if (!isObject(obj)) {
            throw new TypeError('forOwn called on a non-object');
        }

        //post-pone check till needed
        if (_hasDontEnumBug == null) checkDontEnum();

        for (key in obj) {
            exec(fn, obj, key, thisObj);
        }

        if (_hasDontEnumBug) {
            while (key = _dontEnums[i++]) {
                exec(fn, obj, key, thisObj);
            }
        }
    }