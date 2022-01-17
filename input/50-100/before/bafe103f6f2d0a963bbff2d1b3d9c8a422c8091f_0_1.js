function (/*Multiple Arguments*/tempArray) {
    var paraArray = (typeof tempArray == "Array") ? tempArray : arguments;
    var prev = paraArray[0];
    for (var i = 1; i < paraArray.length; i++) {
        if (paraArray[i] != null) {
            prev = cc.Sequence._actionOneTwo(prev, paraArray[i]);
        }
    }
    return prev;

}