function(input, st) {
    var jsonObj = input.getJSON();
    // check
    var check = function(o) {
        if (o.Axis) {
            return true;
        }
        return false;
    };
    if (!check(jsonObj)) {
        return;
    }

    if (!osgDB.ObjectWrapper.serializers.osg.Object(input,st)) {
        return;
    }

    if (jsonObj.Angle) {
        st.setAngle(jsonObj.Angle);
    }

    st.setAxis(jsonObj.Axis);

    return st;
}