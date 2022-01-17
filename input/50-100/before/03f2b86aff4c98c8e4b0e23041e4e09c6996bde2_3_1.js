function(){

      _addInput.css('opacity', 0).css('cursor', "pointer").val('').blur();

      _addCancelIcon.css('right', '-30px');

      _addButton.width('120px').one('click', _expand);



      //Clicking the 'X' icon bubbles the click event up to the parent button causing expand to call again.

      return false; 

  }