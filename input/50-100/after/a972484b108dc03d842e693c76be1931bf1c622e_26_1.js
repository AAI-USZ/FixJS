function (imageUrl) {
    // compute image type
    var imageType = cc.computeImageFormatType(imageUrl);
    if (imageType == cc.FMT_UNKNOWN) {
        cc.log("unsupported format" + imageUrl);
        return;
    }
    var image = new Image();
    image.src = imageUrl;
    image.onLoad = function (e) {
        cc.TextureCache.getInstance().cacheImage(imageUrl, image);
    };
}