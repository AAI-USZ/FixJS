function(input, attr) {
    var jsonObj = input.getJSON();
    var check = function(o) {
        if (o.Mode !== undefined) {
            return true;
        }
        return false;
    };
    if (!check(jsonObj)) {
        return;
    }

    osgDB.ObjectWrapper.serializers.osg.Object(input, attr);
    attr.setMode(jsonObj.Mode);
    return attr;
}