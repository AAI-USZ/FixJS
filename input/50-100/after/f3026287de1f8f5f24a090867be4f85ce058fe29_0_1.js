function(e) {
	
	//     	$(this).find('.hidden_info').find('.tr_actions').toggleClass('table_hidden');
	var tracks = $(this).find('.hidden_info').find('.tr_status'); 
	if (tracks.length == 0 || tracks.html() == 'SUCCESS'){
	    $(this).find('.hoover_actions').toggleClass('table_hidden');
	} else if (tracks.length > 0){
	    show_status(e, $(this), tracks.html(), true);
	    
	}
	
	//toggleClass('row_hover');
	//show_actions($(this));
    }