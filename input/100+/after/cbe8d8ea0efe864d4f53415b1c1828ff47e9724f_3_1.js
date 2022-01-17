function setsEquivalent(actual, expected) {
    if (actual == null && expected != null) return false;
    if(actual.length != expected.length) return false;

    for(var i=0; i<expected.length; i++) {
        var curExpected = expected[i];
        var isObj = typeof(curExpected) == 'object';
        var found = false;

        for(var j=0; j<actual.length; j++) {
            var curActual = actual[j];

            if((isObj && objectsEquivalent(curActual, curExpected)) || curActual == curExpected) {
                found = true;
                break;
            }
        }

        if(!found) return false;
    }

    return true;
}