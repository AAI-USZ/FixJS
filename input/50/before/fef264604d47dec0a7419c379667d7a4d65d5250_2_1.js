function(obj){
        return /\bObject\b/.test(Object.prototype.toString.call(obj));
    }