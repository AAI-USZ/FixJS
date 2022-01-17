function(e) {
            if(e && e.toString().substr(0, existingColumnFamilyException.length) !== existingColumnFamilyException) {
                throw e;
            }
        }