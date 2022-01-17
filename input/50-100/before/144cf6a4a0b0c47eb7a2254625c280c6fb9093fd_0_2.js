function(){
	        				var thisClass = $(this).attr('class');
	        				$(this).parent().siblings("tr." + thisClass + "_param").hide();
	        			}