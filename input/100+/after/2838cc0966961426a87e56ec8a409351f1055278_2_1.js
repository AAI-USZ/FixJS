function deepEquals(t1, t2, checkId) {
        var ret = true;
        if (undefined === checkId)
            checkId = false;
        if (t1.getLabel() != t2.getLabel() ||
            t2.getValue() != t2.getValue() ||
            (checkId && t1.id != t2.id) ||
            !!t1.children != !!t2.children ||
            (t1.children && t1.children.length != t2.children.length)) {
            return false;
        }
        array.some(t1.children, function(at, i) {
            if (!deepEquals(at, t2.children[i], checkId)) {
                ret = false;
                return true;
            }
        });
        return ret;
    }