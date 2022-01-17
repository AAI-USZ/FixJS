function( obj ) {
        if (this.isObject(obj)) {
            for (var name in obj) {
                return false;
            }
            return true;
        }else{
            throw new Error('object type error!');
        }
    }