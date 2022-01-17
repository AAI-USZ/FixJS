function DependencyManager() {
    var that = this;
    this.factories = {};
    this.visualList = {};
    // sse handling
    this.sse = new sse.EventSource('/events');

    this.sse.on('savecomponent', function (evt) {
        var typeInfo = JSON.parse(evt.data);
        that.reloadModule(typeInfo.factory, typeInfo.type);
    });
    this.sse.on('newcomponent', function (evt) {
        var typeInfo = JSON.parse(evt.data);
        that.reloadModule(typeInfo.factory, typeInfo.type);
    });
    this.sse.on('deletecomponent', function (evt) {
        var typeInfo = JSON.parse(evt.data);
        that.unloadModule(typeInfo.factory, typeInfo.type);
    });
    this.sse.on('newpackage', function (evt) {
        var packageName = JSON.parse(evt.data);
        that.addEmptyPackage(packageName);
    });

}