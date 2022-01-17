function(obj){
        return obj === null ? false : /\bObject\b/.test(Object.prototype.toString.call(obj));
    }