function()
     {
        var pos = $(".msg_content").index(this);
	var key = location.pathname+'/'+ pos;
        var display = $.cookies.get(key);
	if ( display == null ){
		if ( pos == 0 ){
    			$(this).slideToggle(600,function(){ 
		    		$(this).parent().children('.msg_head').css('background-image','url("../images/div_opened.gif")');
				$.cookies.set(key, $(this).css('display'));
			});
		} else {
			$(this).parent().children('.msg_head').css('background-image','url("../images/div_closed.gif")');
		    	$.cookies.set(key, $(this).css('display'));
		}
	}else{
		if ( display != 'none' ) {
			$(this).parent().children('.msg_head').css('background-image','url("../images/div_opened.gif")');
			$(this).show();
		} else {
			$(this).parent().children('.msg_head').css('background-image','url("../images/div_closed.gif")');
		}
	}
	
     }