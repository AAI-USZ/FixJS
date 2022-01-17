function(arrayDest, arrayOrigin, overwrite)  {
        var _clonedArr = [];
        var longest = arrayDest.length > arrayOrigin.length ?
                                            arrayDest.length :
                                                arrayOrigin.length;
        for (var i = 0; i < longest; i++) {
            _clonedArr[i] = _copyAll(arrayDest[i], arrayOrigin[i], overwrite);
        }
        return _clonedArr;
    }