function(context){
	var height = 0;
	if ($('#login', context).length){
		var elems = '#login'; 
	} else {
		var elems = '#fuel_main_top_panel, #fuel_actions, #fuel_notification, #fuel_main_content_inner, #list_container, .instructions';
	}
	$(elems, context).each(function(i){
		height += $(this).outerHeight();
	})
	return height;
}