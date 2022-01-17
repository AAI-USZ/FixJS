function(entityDest, entityOrg, overwrite) {
        if (entityDest == null || entityDest == undefined) {
            return _clone(entityOrg);
        } else if (entityOrg == null || entityOrg == undefined) {
            return _clone(entityDest);
        } else if (Object.prototype.toString.call(entityOrg) === '[object Array]') {
            return _copyArray(entityDest, entityOrg, overwrite);
        } else if (typeof entityOrg === 'object') {
            return _copyObj(entityDest, entityOrg, overwrite);
            // doesn't support regexps yet.
        } else {
            if (overwrite) {
                return entityOrg;
            } else {
                return entityDest;
            }

        }
    }