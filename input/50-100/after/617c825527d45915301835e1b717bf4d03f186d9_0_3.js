function(instance/*mixin1, mixin2, ...*/){
    for(var i = 1, L = arguments.length ; i < L ; i++){
        var mixin = arguments[i];
        if(mixin){
            mixin = def.object.as(mixin.prototype || mixin);
            if(mixin){
                mixinRecursive(instance, mixin);
            }
        }
    }

    return instance;
}