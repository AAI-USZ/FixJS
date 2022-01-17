function(){

      addInput.css('opacity', 0).css('cursor', "pointer").val('').blur();

      addCancelIcon.css('right', '-30px');

      addButton.width('120px').one('click', expand);



      //Clicking the 'X' icon bubbles the click event up to the parent button causing expand to call again.

      return false; 

  }