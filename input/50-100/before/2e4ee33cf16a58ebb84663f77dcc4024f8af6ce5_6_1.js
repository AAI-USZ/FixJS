function(imageSource, format) {
    return osg.Texture.createFromImg(osgDB.readImage(imageSource), format);
}