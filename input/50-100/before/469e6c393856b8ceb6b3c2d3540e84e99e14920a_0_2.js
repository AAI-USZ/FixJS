function(obj) {
        if(typeof obj != 'object') {
            return obj;
        }

        var _clonedObj = {};
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop)) {
                _clonedObj[prop] = _clone(obj[prop]);
            }
        }
        return _clonedObj;
    }