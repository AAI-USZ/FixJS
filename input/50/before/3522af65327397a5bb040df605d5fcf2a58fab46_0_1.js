function(value){
            return value === undefined ? ret.get(this[0])
                : ret.set(this[0], value) || this;
        }