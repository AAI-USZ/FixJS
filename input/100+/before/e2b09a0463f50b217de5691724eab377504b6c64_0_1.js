f	if (data.indexOf('{')===0){
		eval('var data = ' + data + ';');
	}
	if (data.hash){
		if (glob.prefix && window.location.pathname != glob.prefix){
			window.location.pathname = glob.prefix + '#' + data.hash;
		} else {
			window.location.hash = data.hash;
		}
	} else {
		jQuery('#changable_content').html(data);
		
		jQuery.event.trigger( "newContent", [type, jQuery('#changable_content')] );
	}
}
