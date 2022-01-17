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
            var file = Module._resolveFilename(dep, module);
            evBus.emit('requestModule', file);
            this.params[i] = module.require(file);
            if(this.params[i]) {
                this.remain--;
            }
            else {
                evBus.once('file:'+file, this.receiveData.bind(this, i));
            }
        }
    }

    if(this.remain <= 0) {
        process.nextTick(this.call.bind(this));
    }
}