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
        return;
    }

    if (!osgDB.ObjectWrapper.serializers.osg.Object(input,st)) {
        return;
    }

    if (jsonObj.Translate) {
        st.setTranslate(jsonObj.Translate);
    }
    return st;
}