function(){ 
		    		$(this).parent().children('.msg_head').css('background-image','url("' + baseUrl() +  '/images/div_opened.gif")');
				$.cookies.set(key, $(this).css('display'));
			}