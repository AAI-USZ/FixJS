function(arr)  {
        var _clonedArr = [];
        for (var el in arr) {
            _clonedArr.push(_cloneAll(arr[el]));
        }
        return _clonedArr;
    }