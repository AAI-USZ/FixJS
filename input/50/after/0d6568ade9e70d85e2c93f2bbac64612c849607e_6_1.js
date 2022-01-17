function _getCodeHints(jsonStr) {
        var hintObj = JSON.parse(jsonStr);
        return $.map(hintObj, function (value, key) {
            return key;
        }).sort();
    }