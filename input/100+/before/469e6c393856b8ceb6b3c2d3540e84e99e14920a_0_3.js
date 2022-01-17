function() {

    var _cloneArray = function(arr)  {
        var _clonedArr = [];
        for(var el in arr) {
            _clonedArr.push(_clone(arr[el]));
        }
        return _clonedArr;
    }

    var _copyArray = function(arrayDest, arrayOrigin, overwrite)  {
        var _clonedArr = [];
        var longest = arrayDest.length > arrayOrigin.length ?
                                            arrayDest.length :
                                                arrayOrigin.length;
        for(var i = 0; i < longest; i++) {
            _clonedArr[i] = _copy(arrayDest[i], arrayOrigin[i], overwrite);
        }
        return _clonedArr;
    }


    var _cloneObj = function(obj) {
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

    var _copyObj = function(objDest, objOrig, overwrite) {
        if(typeof objDest != 'object') {
            return _clone(objOrg);
        }

        var _clonedObj = _clone(objDest);
        for(var prop in objOrig) {
            if(objOrig.hasOwnProperty(prop)) {

                _clonedObj[prop] = _copy(objDest[prop], objOrig[prop], overwrite);
            }
        }
        return _clonedObj;
    }

    var _clone = function (param) {
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

    var _copy = function(entityDest, entityOrg, overwrite) {
        if (entityDest == null || entityDest == undefined) {
            return _clone(entityOrg);
        } else if (entityOrg == null || entityOrg == undefined) {
            return _clone(entityDest);
        } else if(Object.prototype.toString.call(entityOrg) === '[object Array]') {
            return _copyArray(entityDest, entityOrg, overwrite)
        } else if(typeof entityOrg === 'object') {
            return _copyObj(entityDest, entityOrg, overwrite);
            // doesn't support regexps yet.
        } else {
            if(overwrite) {
                return entityOrg;
            } else {
                return entityDest;
            }

        }
    }

    return {
        extend: function(destinationObject, originObject) {
            return $.extend(true, destinationObject, originObject)
        },
        clone: function (clonable) {
            return $.extend(true, {}, clonable);
        },
        copy: function(entityDest, entityOrg, overwrite) {
            return _copy(entityDest, entityOrg, overwrite);
        }
    };
}