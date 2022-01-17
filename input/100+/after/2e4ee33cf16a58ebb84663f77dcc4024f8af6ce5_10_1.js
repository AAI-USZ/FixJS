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
        return;
    }

    if (!osgDB.ObjectWrapper.serializers.osg.Object(input, animation)) {
        return;
    }

    // channels
    for (var i = 0, l = jsonObj.Channels.length; i < l; i++) {
        osgDB.Promise.when(input.setJSON(jsonObj.Channels[i]).readObject()).then(function(channel) {
            if (channel) {
                animation.getChannels().push(channel);
            }
        });
    }
    return animation;
}