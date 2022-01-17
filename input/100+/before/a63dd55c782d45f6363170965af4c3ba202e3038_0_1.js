function DefineBlock(module, dependencies, callback) {
    this.params = new Array(dependencies.length);
    this.remain = dependencies.length;
    this.module = module;
    this.callback = callback;

    for(var i=0; i<dependencies.length; i++) {
        var dep = dependencies[i];
        var pos, match;
        if(dep[0] == '@') {
            evBus.emit('requestVar', dep);
            if(typeof _data[dep] != 'undefined') {
                this.params[i] = _data[dep];
                this.remain--;
            }
            else {
                evBus.once(dep, this.receiveData.bind(this, i));
            }
        }
        else {
            evBus.emit('requestModule', dep);
            this.params[i] = module.require(dep);
            this.remain--;
        }
    }

    if(this.remain <= 0) {
        this.call();
    }
}