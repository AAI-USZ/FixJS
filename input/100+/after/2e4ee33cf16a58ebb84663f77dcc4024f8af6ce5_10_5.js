function(input, umt) {
    var jsonObj = input.getJSON();
    // check
    var check = function(o) {
        if (o.Name && o.StackedTransforms) {
            return true;
        }
        return false;
    };
    if (!check(jsonObj)) {
        return;
    }

    if (osgDB.ObjectWrapper.serializers.osg.Object(input, umt) === undefined) {
        return;
    }

    for (var i = 0, l = jsonObj.StackedTransforms.length; i < l; i++) {
        var entry = jsonObj.StackedTransforms[i];
        var ste = input.setJSON(entry).readObject();
        if (ste) {
            umt.getStackedTransforms().push(ste);
        }
    }
    return umt;
}