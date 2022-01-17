function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      if (data.onDrag){
        Spin.updateInput(e, data);
        var d = data.dX / data.width;
        var dFrame = d * data.frames * data.sense;
        var frame = Math.round(data.clickframe + dFrame);

        $this.spritespin("update", frame);  // update to frame
        $this.spritespin("animate", false);  // stop animation
      }
    }