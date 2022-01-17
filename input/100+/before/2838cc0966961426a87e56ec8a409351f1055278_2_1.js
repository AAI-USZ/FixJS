function deepEquals(t1, t2, checkId) {
        if (undefined === checkId)
            checkId = false;
        if (t1.getLabel() != t2.getLabel() ||
            t2.getValue() != t2.getValue() ||
            (checkId && t1.id != t2.id) ||
            !!t1.children != !!t2.children ||
            (t1.children && t1.children.length != t2.children.length)) {
            return false;
        }
        array.forEach(t1.children, function(at, i) {
            if (!deepEquals(at, t2.children[i]))
                return false;
        });
        return true;
    }