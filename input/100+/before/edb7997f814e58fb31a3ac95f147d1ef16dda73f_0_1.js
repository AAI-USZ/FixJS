function(e){
			     
			    //to show the remaining characters
				remain= opts.maxlim - parseInt($(this).val().length);
				$("#dispremain").text(remain);
				
				$("#tex").keypress(function(e) {
  					if(e.charCode >= 48 || e.charCode == 32 || e.charCode == 13)
   					 if($(this).val().length >= opts.maxlim)
      				return false;
					});
				
			//to decrease the font size as and when required 	
			if ( $(this).get(0).scrollHeight > $(this).height() ) {
       		$(this).css('font-size', '-=1');
    		}
			
			//to increase the fontsize detecting backspace and delete only when required,
			//here we r increasing the font size and at the same time we check if total height does not 
			//exceed the height of the textarea specified
			if (e.keyCode==8 || e.keyCode==46)
			{
				$(this).css('font-size', '+=1');
				if ( $(this).get(0).scrollHeight > $(this).height() ) {
       			$(this).css('font-size', '-=1');
    			}
			}
		}