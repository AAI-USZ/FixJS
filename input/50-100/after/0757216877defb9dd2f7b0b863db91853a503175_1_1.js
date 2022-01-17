function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      Spin.updateInput(e, data);
      $this.spritespin("animate", false); // stop animation
      if (data.currentX > data.width / 2){
        $this.spritespin("frame", data.frame + 1);
        data.reverse = false;
      } else {
        $this.spritespin("frame", data.frame - 1);
        data.reverse = true;
      }
    }