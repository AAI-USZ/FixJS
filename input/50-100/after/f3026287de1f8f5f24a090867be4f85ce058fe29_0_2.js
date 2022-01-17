function(ind, dome){
	var status = $(dome).find('.tr_status').html();
	if (status){
	    status = status.toLowerCase();
	    if(status == 'failure' || status == 'running'){
		$(dome).removeClass();
	    }
	    $(dome).addClass('track-' + status);
	}
    }