function(index, file){
		  
	    //avoid errors if weather is set to null
	    if(!file.weather) {
	      file.weather = {};
	    }
	    
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