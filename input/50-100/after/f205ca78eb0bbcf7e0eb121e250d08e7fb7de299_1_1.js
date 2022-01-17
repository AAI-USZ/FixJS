function (AThis,AEvent) {
    // zoom in/out canvas
    //console.log('canvasOnMouseWheel(x:'+AEvent.clientX+', y:'+AEvent.clientY+', b:'+AEvent.button+')');

    if (kiji.button == 2) {
      if (AEvent.wheelDelta > 0)
        updateZoom(AThis,AEvent,1,0.5)
      else
        updateZoom(AThis,AEvent,1,-0.5);
      return false;
    }


    /*
    if (kiji.button == 1) {
      if (AEvent.wheelDelta > 0)
        updateZoom(AThis,AEvent,1,0.5)
      else
        updateZoom(AThis,AEvent,1,-0.5);
      return false;
    }
    */
  }