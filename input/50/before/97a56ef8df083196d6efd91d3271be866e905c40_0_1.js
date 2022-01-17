function(i, elem){
	  if(elem.thum_base64) { // only write path as base64 when there was a base64 image provided, otherwise there is no images
  		elem.thumb_base64 = "/media_resources/"+elem.id+"/image?size=small_125";
	  }
	}