function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      Spin.updateInput(e, data);
      if (data.currentX > data.width / 2){
        $this.spritespin("frame", data.frame + 1);
      } else {
        $this.spritespin("frame", data.frame - 1);
      }
    }