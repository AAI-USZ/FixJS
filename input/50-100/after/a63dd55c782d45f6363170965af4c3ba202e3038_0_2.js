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
    this.exports = undefined;
    new DefineBlock(this, dependencies, function() {
        callback.apply(this, arguments);
        if(typeof this.ready == 'function') {

        }
    });
}