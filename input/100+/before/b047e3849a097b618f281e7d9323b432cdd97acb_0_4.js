function(index, file){
		  
	    if (file.Type === "ImageType") {
  		  images.push(file);
  		} else if (file.Type === "Object3d") {
  		  threed.push(file);
  		} else if (file.Type === "VideoType") {
  		  videos.push(file);
  		} else if (file.Type === "SoundType") {
  		  sounds.push(file);
  		} else if (file.Type === "Text") {
  		  text.push(file);
  		}
	    
	  }