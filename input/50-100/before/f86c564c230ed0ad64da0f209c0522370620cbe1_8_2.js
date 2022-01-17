function(images, callback){
    if (typeof (images) === "string") { images = [images]; }
    var i, data = {
      callback : callback,
      numLoaded: 0,
      numImages: images.length,
      images   : []
    }
    for (i = 0; i < images.length; i += 1 ) {
      Loader.load(images[i], data); 
    }
  }