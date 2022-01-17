function(i){

		// go all the way up to the value containing element because error messages insert HTML that won't allow us to use prev()
		var linkedInfo = $(this).closest('.value').find('.linked_info').text();
		if (linkedInfo.length){
			bindLinked($(this).attr('id'), eval('(' + linkedInfo + ')'));
		}
	}