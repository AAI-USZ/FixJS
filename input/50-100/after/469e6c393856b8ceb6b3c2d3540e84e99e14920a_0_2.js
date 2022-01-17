function(obj) {
        if (typeof obj != 'object') {
            return obj;
        }
        var objAlreadyInsertedPosition = _clonedObjs.indexOf(obj);
        if (objAlreadyInsertedPosition >= 0) {
            return undefined;
        } else {
            _clonedObjs.push(obj);
        }

        var _clonedObj = {};
        var _clonedValue = null;
        for (var prop in obj) {
            if (prop //&&
                    // obj.hasOwnProperty(prop) &&
                        // !prop.indexOf('_') == 0
                        )
            {
                _clonedValue = _cloneAll(obj[prop]);
                _clonedObj[prop] = _clonedValue;
            }
        }

        return _clonedObj;
    }