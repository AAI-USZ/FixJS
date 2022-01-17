function(){
      var $this = $(this);
      var data = $this.data('spritespin');
      
      // update frame counter
      if (frame === undefined){
        data.frame += ((data.animation && data.reverse) ? -data.frameStep : data.frameStep);
      } else {
        data.frame = frame;
      }
      
      // wrap/clamp the frame value to fit in range [0, data.frames]
      if ( data.animation ||                    // wrap frame during animation
          (!data.animation && data.frameWrap)){   // wrap frame during user input 
        data.frame = Spin.wrap(data.frame, 0, data.frames - 1, data.frames);
      } else {
        data.frame = Spin.clamp(data.frame, 0, data.frames - 1);
      }

      // stop animation if the loopFrame is reached
      if (!data.loop && data.animation && (data.frame === data.loopFrame)){
        api.animate.apply(data.target, [false]);
      }
      
      data.target.trigger("onFrame", data);
    }