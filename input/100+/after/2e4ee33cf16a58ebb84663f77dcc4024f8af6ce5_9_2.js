function(input, node) {
    var jsonObj = input.getJSON();

    var check = function(o) {
        return true;
    };
    if (!check(jsonObj)) {
        return;
    }

    osgDB.ObjectWrapper.serializers.osg.Object(input, node);

    var promiseArray = [];

    var createCallback = function(jsonCallback) {
        var promise = input.setJSON(jsonCallback).readObject();
        var df = osgDB.Promise.defer();
        promiseArray.push(df.promise);
        osgDB.Promise.when(promise).then(function(cb) {
            if (cb) {
                node.addUpdateCallback(cb);
            }
            df.resolve();
        });
    };

    if (jsonObj.UpdateCallbacks) {
        for (var j = 0, l = jsonObj.UpdateCallbacks.length; j < l; j++) {
            createCallback(jsonObj.UpdateCallbacks[j]);
        }
    }


    if (jsonObj.StateSet) {
        var pp = input.setJSON(jsonObj.StateSet).readObject();
        var df = osgDB.Promise.defer();
        promiseArray.push(df.promise);
        osgDB.Promise.when(pp).then(function(stateset) {
            node.setStateSet(stateset);
            df.resolve();
        });
    }

    var createChildren = function(jsonChildren) {
        var promise = input.setJSON(jsonChildren).readObject();
        var df = osgDB.Promise.defer();
        promiseArray.push(df.promise);
        osgDB.Promise.when(promise).then(function(obj) {
            if (obj) {
                node.addChild(obj);
            }
            df.resolve(obj);
        });
    };

    if (jsonObj.Children) {
        for (var i = 0, k = jsonObj.Children.length; i < k; i++) {
            createChildren(jsonObj.Children[i]);
        }
    }

    var defer = osgDB.Promise.defer();
    osgDB.Promise.all(promiseArray).then(function() {
        defer.resolve(node);
    });

    return defer.promise;
}