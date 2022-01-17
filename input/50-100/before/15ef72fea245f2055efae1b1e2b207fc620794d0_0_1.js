function() {
		//console.log($(this).parent().attr('id'));
		id = $(this).parent().attr('id');
		id = id.split('-')[1];
		$('#item-'+id).remove();
	}