function (/*Multiple Arguments*/tempArray) {
    var paramArray = (typeof tempArray == "Array") ? tempArray : arguments;
    var prev = paramArray[0];
    for (var i = 1; i < paramArray.length; i++) {
        if (paramArray[i] != null) {
            prev = this._actionOneTwo(prev, paramArray[i]);
        }
    }
    return prev;
}