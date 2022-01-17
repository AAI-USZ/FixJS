function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      Spin.resetInput(data);
      data.onDrag = false;
    }