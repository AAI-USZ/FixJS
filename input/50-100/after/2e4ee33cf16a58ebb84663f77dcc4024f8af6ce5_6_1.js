function(imageSource, format) {
    var texture = new osg.Texture();
    osgDB.Promise.when(osgDB.readImage(imageSource)).then(
        function(img) {
            texture.setImage(img, format);
        }
    );
    return texture;
}