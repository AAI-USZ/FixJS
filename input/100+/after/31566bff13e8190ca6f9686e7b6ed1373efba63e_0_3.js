function addTween(c, attrs, obj, rootObj) {
        for(var key in c) {
            if(key !== 'duration' && key !== 'easing' && key !== 'callback') {
                // if val is an object then traverse
                if(Kinetic.GlobalObject._isObject(c[key])) {
                    obj[key] = {};
                    addTween(c[key], attrs[key], obj[key], rootObj);
                }
                else {
                    that._add(that._getTween(attrs, key, c[key], obj, rootObj));
                }
            }
        }
    }