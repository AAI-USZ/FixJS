function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      if (data.onDrag){
        // perform default drag behavior
        Spin.updateInput(e, data);
        var d = data.dX / data.width;
        var dFrame = d * data.frames * data.sense;
        var frame = Math.round(data.clickframe + dFrame);
        
        api.update.apply($this, [frame]);     // update to frame
        api.animate.apply($this, [false]);    // stop animation
        
        // calculate framtetime for spinwheel
        if (data.ddX !== 0){
          d = data.ddX / data.width;
          dFrame = d * data.frames * data.sense;
          data.frameTime = (data.frameTime / dFrame);
          data.reverse = (data.ddX < 0);
        }
      }
    }