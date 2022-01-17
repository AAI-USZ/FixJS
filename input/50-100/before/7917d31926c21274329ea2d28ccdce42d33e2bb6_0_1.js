function _getCodeHints(jsonStr, filter) {
        var hintObj = JSON.parse(jsonStr),
            hintArray = [];
        hintArray = $.map(hintObj, function(value, key) {           
            return key;
        });

        if (!filter) {
            return hintArray;
        } else {
            var matcher = new RegExp(filter.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), "i" );
    
            return $.grep(hintArray, function(value) {
                return matcher.test( value );
            });
        }
    }