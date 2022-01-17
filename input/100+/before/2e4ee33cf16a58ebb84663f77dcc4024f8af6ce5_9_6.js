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

    osgDB.ObjectWrapper.serializers.osg.Node(input, node);
    var light = input.setJSON(jsonObj.Light).readObject();
    node.setLight(light);
}