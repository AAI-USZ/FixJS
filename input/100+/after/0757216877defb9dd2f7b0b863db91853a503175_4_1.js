function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      if (data.onDrag){
        Spin.updateInput(e, data);
        
        var frame = data.frame;
        
        if (data.dX > data.width * 0.25){
          frame = data.frame - 1;       
          data.onDrag = false;
        }
        if (data.dX < -data.width * 0.25){
          frame = data.frame + 1;
          data.onDrag = false;
        }
        
        $this.spritespin("update", frame);  // update to frame
        $this.spritespin("animate", false); // stop animation
      }
    }