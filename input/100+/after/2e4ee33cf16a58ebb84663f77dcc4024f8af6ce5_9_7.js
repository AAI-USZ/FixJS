function(input, node) {
    var jsonObj = input.getJSON();
    var check = function(o) {
        if (o.PrimitiveSetList !== undefined && o.VertexAttributeList !== undefined) {
            return true;
        }
        return false;
    };
    if (!check(jsonObj)) {
        return;
    }

    var arraysPromise = [];
    arraysPromise.push(osgDB.ObjectWrapper.serializers.osg.Node(input, node));

    var createPrimitive = function(jsonPrimitive) {
        var defer = osgDB.Promise.defer();
        arraysPromise.push(defer.promise);
        var promise = input.setJSON(jsonPrimitive).readPrimitiveSet();
        osgDB.Promise.when(promise).then(function(primitiveSet) {
            console.log("call primitive");
            if (primitiveSet !== undefined) {
                node.getPrimitives().push(primitiveSet);
            }
            defer.resolve(primitiveSet);
        });
    };

    for (var i = 0, l = jsonObj.PrimitiveSetList.length; i < l; i++) {
        var entry = jsonObj.PrimitiveSetList[i];
        createPrimitive(entry);
    }

    var createVertexAttribute = function(name, jsonAttribute) {
        var defer = osgDB.Promise.defer();
        arraysPromise.push(defer.promise);
        var promise = input.setJSON(jsonAttribute).readBufferArray();
        osgDB.Promise.when(promise).then(function(buffer) {
            console.log("call vertex " + name);
            if (buffer !== undefined) {
                node.getVertexAttributeList()[name] = buffer;
            }
            defer.resolve(buffer);
        });
    };
    for (var key in jsonObj.VertexAttributeList) {
        if (jsonObj.VertexAttributeList.hasOwnProperty(key)) {
            createVertexAttribute(key, jsonObj.VertexAttributeList[key]);
        }
    }

    var defer = osgDB.Promise.defer();
    osgDB.Promise.all(arraysPromise).then(function() { defer.resolve(node);});
    return defer.promise;
}