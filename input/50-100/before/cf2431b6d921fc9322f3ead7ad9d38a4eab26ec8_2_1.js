function(imageSource, format) {
    var a = new osg.Texture();
    if (imageSource !== undefined) {
        var img = new Image();
        img.src = imageSource;
        a.setImage(img, format);
    }
    return a;
}