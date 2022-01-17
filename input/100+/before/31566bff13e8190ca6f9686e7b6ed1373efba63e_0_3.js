function addTween(c, attrs) {
        for(var key in c) {
            if(key !== 'duration' && key !== 'easing' && key !== 'callback') {
                // if val is an object then traverse
                if(Kinetic.GlobalObject._isObject(c[key])) {
                    addTween(c[key], attrs[key]);
                }
                else {
                    that._add(that._getTween(attrs, key, c[key]));
                }
            }
        }
    }