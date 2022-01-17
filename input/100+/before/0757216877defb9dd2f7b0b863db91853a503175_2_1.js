function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      if (data.onDrag){
        Spin.updateInput(e, data);
        var d = data.dX / data.width;
        var dFrame = d * data.frames * data.sense;
        var frame = Math.round(data.clickframe + dFrame);
        
        api.update.apply($this, [frame]);   // update to frame
        api.animate.apply($this, [false]);  // stop animation
      }
      return false; 
    }