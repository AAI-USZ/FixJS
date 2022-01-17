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
        return false;
    }

    if (!osgDB.ObjectWrapper.serializers.osg.Object(input,st)) {
        return false;
    }

    if (jsonObj.Angle) {
        st.setAngle(jsonObj.Angle);
    }

    st.setAxis(jsonObj.Axis);

    return true;
}