function _getCodeHints(jsonStr, filter) {
        var hintObj = JSON.parse(jsonStr);
        var hintArray = $.map(hintObj, function (value, key) {
            return key;
        }).sort();

        if (!filter) {
            return hintArray;
        } else {
            var matcher = new RegExp(filter.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i");
    
            return $.grep(hintArray, function (value) {
                return matcher.test(value);
            });
        }
    }