function(extend){
    var fn = this;
    
    var ret = function(){
        return fn.apply(this, arguments);
    };
    
    for (var i in extend){
        ret[i] = extend[i];
    }
    
    return ret;
}