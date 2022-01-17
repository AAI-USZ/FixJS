function(sizeInPixels){
   return new cc.Size(sizeInPixels.width / cc.CONTENT_SCALE_FACTOR(), sizeInPixels / cc.CONTENT_SCALE_FACTOR());
}