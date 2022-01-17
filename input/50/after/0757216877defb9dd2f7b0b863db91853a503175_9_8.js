function(e){ 
      var $this = $(this), data = $this.data('spritespin');
      data.onDrag = false;
      Spin.resetInput(data);
    }