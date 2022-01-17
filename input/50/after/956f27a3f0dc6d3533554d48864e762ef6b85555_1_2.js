function(sizeInPixels){
   return new cc.Size(sizeInPixels.width / cc.CONTENT_SCALE_FACTOR(), sizeInPixels.height / cc.CONTENT_SCALE_FACTOR());
}