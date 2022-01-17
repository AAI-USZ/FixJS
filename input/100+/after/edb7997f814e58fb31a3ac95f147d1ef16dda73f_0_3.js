function(options) {
 		var defaults = {
   			 maxlim : 100   //maxlim is the Limit to be set to the no of characters
  			};				//that will be entered in the text area
  		var opts = $.extend(defaults, options);		
		$(window).load(function() {
			//specifyng the css of the id referred to the textarea,
			//this is required as must to make it non resizable. The font-size can be changed
			//but the rest should be left as it is
			$('#dispremain').css("position","relative");
			$('#tex').css("resize", "none");
			$('#tex').css("overflow-y", "hidden");
			$('#tex').css("overflow-x", "hidden");
			$('#tex').css("font-size", "50px");
			$('#tex').css("padding", "0px");
			var remain=0,maxfontsize=parseInt($('#tex').css("font-size"));
			$("#tex").keydown(function(e){
			     
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
			//here we are increasing the font size and at the same time we check if total height does not 
			//exceed the height of the textarea specified
			if (e.keyCode==8 || e.keyCode==46)
			{
				//the first if statement is to limit the text size increment to the max fontsize defined.
				if(parseInt($(this).css('font-size')) < maxfontsize ) {
					$(this).css('font-size', '+=1');
					if ( $(this).get(0).scrollHeight > $(this).height() ) {
       				$(this).css('font-size', '-=1');
    				} 
				}
			} 
		});				
		});		
	 }