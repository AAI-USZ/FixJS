function(input, animation) {
    var jsonObj = input.getJSON();
    // check
    // 
    var check = function(o) {
        if (o.Name && o.Channels && o.Channels.length > 0) {
            return true;
        }
        if (!o.Name) {
            osg.log("animation has field Name, error");
            return false;
        }
        return false;
    };
    if (!check(jsonObj)) {
        return false;
    }

    if (!osgDB.ObjectWrapper.serializers.osg.Object(input, animation)) {
        return false;
    }

    // channels
    for (var i = 0, l = jsonObj.Channels.length; i < l; i++) {
        var channel = input.setJSON(jsonObj.Channels[i]).readObject();
        if (channel) {
            animation.getChannels().push(channel);
        }
    }
    return true;
}