function(){
          var x = -($(this).outerWidth() - $(this).siblings('.action').outerWidth());
        	$(this).css('left', x);
        	setFilename();
        }