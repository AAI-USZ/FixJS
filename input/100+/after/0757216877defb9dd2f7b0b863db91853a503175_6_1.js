function(data){
    // clear the stage
    data.stage.empty();
    // precalculate and cache options for this module
    var opts = data.modopts = {
      gridsheet : (data.images.length == 1),
      resX      : (data.resolutionX || data.images[0].width),
      resY      : (data.resolutionY || data.images[0].height),
      offX      : (data.offsetX || 0),
      offY      : (data.offsetY || 0),
      stepX     : (data.stepX || data.width),
      stepY     : (data.stepY || data.height),
      numFramesX: (data.framesX || data.frames),
      oldFrame  : data.frame
    };

    if (!opts.gridsheet && !data.canvas){
      for(var i = 0; i < data.images.length; i+= 1){
        var img = $(data.images[i]).hide();
        data.stage.append(img);
      }      
    }
    Module.draw(data);
  }