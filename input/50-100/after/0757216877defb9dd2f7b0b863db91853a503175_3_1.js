function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      if (data.onDrag){
        data.onDrag = false;
        $this.spritespin("animate", $this.spritespin("animate"));
      }
    }