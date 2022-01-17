function(ind, dome){
	var status = $(dome).find('.tr_status').html();
	if (status){
	    status = status.toLowerCase();
	    if(status == 'failure'){
		$(dome).removeClass();
	    }
	    $(dome).addClass('track-' + status);
	}
    }