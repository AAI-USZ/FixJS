function(input, node) {
    var jsonObj = input.getJSON();
    var check = function(o) {
        if (o.Light !== undefined) {
            return true;
        }
        return false;
    };
    if (!check(jsonObj)) {
        return;
    }

    var defer = osgDB.Promise.defer();
    var promise = osgDB.ObjectWrapper.serializers.osg.Node(input, node);
    osgDB.Promise.all([input.setJSON(jsonObj.Light).readObject(), promise]).then( function (light) {
        node.setLight(light);
        defer.resolve(node);
    });
    return defer.promise;
}