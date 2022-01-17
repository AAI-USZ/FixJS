function (arr, type) {
    if (arr && arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
            if (!(arr[i] instanceof  type)) {
                cc.log("element type is wrong!");
                return false;
            }
        }
    }
    return true;
}