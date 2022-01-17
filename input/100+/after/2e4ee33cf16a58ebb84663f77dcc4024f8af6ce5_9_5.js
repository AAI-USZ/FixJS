function(input, texture) {
    var jsonObj = input.getJSON();
    var check = function(o) {
        return true;
    };
    if (!check(jsonObj)) {
        return;
    }

    osgDB.ObjectWrapper.serializers.osg.Object(input, texture);

    if (jsonObj.MinFilter !== undefined) {
        texture.setMinFilter(jsonObj.MinFilter);
    }
    if (jsonObj.MagFilter !== undefined) {
        texture.setMagFilter(jsonObj.MagFilter);
    }

    if (jsonObj.WrapT !== undefined) {
        texture.setWrapT(jsonObj.WrapT);
    }
    if (jsonObj.WrapS !== undefined) {
        texture.setWrapS(jsonObj.WrapS);
    }

    if (jsonObj.File !== undefined) {
        osgDB.Promise.when(input.readImageURL(jsonObj.File)).then(
            function(img) {
                texture.setImage(img);
            });
    }
    return texture;
}