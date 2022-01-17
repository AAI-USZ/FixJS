function(dependencies, callback) {
    if(typeof dependencies == 'function') {
        callback = dependencies;
        dependencies = [];
    }
    if(typeof dependencies == 'string') {
        dependencies = [dependencies];
    }
    if(typeof callback != 'function') {
        throw new TypeError("You must pass a callback to define");
    }
    new DefineBlock(this, dependencies, callback);
}