function(input, st) {
    var jsonObj = input.getJSON();
    // check
    var check = function(o) {
        if (o.Name) {
            return true;
        }
        return false;
    };
    if (!check(jsonObj)) {
        return false;
    }

    if (!osgDB.ObjectWrapper.serializers.osg.Object(input,st)) {
        return false;
    }

    if (jsonObj.Quaternion) {
        st.setQuaternion(jsonObj.Quaternion);
    }
    return true;
}