function(frame){
    return this.each(function(){
      var $this = $(this);
      var data = $this.data('spritespin');
      
      // update frame counter
      if (frame === undefined){
        data.frame = (data.frame + (data.reverse ? -1 : 1));
      } else {
        data.frame = frame;
      }
      
      // wrap/clamp the frame value to fit in range [0, data.frames]
      if ((data.animation !== null) && data.loop || 
          (data.animation == null) && data.frameWrap){
        data.frame = Spin.wrap(data.frame, 0, data.frames - 1);
      } else {
        data.frame = Spin.clamp(data.frame, 0, data.frames - 1);
      }

      // stop animation if the loopFrame is reached
      if (!data.loop && (data.animation !== null) && (data.frame === data.loopFrame)){
        api.animate.apply(data.target, [false]);
      }
      
      data.target.trigger("onFrame", data);
    });
  }