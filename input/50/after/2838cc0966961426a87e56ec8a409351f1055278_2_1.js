function(at, i) {
            if (!deepEquals(at, t2.children[i], checkId)) {
                ret = false;
                return true;
            }
        }