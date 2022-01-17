function(objDest, objOrig, overwrite) {
        if (typeof objDest != 'object') {
            return _clone(objOrg);
        }
        var objAlreadyCopiedPosition = _copiedObjs.indexOf(objOrig);
        if (objAlreadyCopiedPosition >= 0) {
            return undefined;
        } else {
            _copiedObjs.push(objOrig);
        }

        var _clonedObj = _clone(objDest);
        for (var prop in objOrig) {
            if (objOrig.hasOwnProperty(prop)) {

                _clonedObj[prop] = _copyAll(objDest[prop], objOrig[prop], overwrite);
            }
        }
        return _clonedObj;
    }