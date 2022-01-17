function(input, node) {
    var jsonObj = input.getJSON();

    var check = function(o) {
        return true;
    };
    if (!check(jsonObj)) {
        return;
    }

    osgDB.ObjectWrapper.serializers.osg.Object(input, node);

    if (jsonObj.UpdateCallbacks) {
        for (var j = 0, l = jsonObj.UpdateCallbacks.length; j < l; j++) {
            var cb = input.setJSON(jsonObj.UpdateCallbacks[j]).readObject();
            if (cb) {
                node.addUpdateCallback(cb);
            }
        }
    }

    if (jsonObj.StateSet) {
        node.setStateSet(input.setJSON(jsonObj.StateSet).readObject());
    }
    
    if (jsonObj.Children) {
        for (var i = 0, k = jsonObj.Children.length; i < k; i++) {
            var obj = input.setJSON(jsonObj.Children[i]).readObject();
            if (obj) {
                node.addChild(obj);
            }
        }
    }
}