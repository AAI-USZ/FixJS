function(input, node) {
    var jsonObj = input.getJSON();
    var check = function(o) {
        if (o.Matrix !== undefined) {
            return true;
        }
        return false;
    };
    if (!check(jsonObj)) {
        return;
    }

    osgDB.ObjectWrapper.serializers.osg.Node(input, node);

    if (jsonObj.Matrix !== undefined) {
        node.setMatrix(jsonObj.Matrix);
    }

}