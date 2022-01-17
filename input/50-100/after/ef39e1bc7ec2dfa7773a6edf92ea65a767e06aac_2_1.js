function(extend){
    for (var i in extend){
        this[i] = extend[i];
    }
    
    return this;
}