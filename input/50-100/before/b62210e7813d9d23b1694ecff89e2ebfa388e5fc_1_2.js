function setupShoppingListEvents() {
	console.log('setting up events');
	
	$('.item-action-delete').live('click', function() {
		console.log($(this).parent().attr('id'));
		id = $(this).parent().attr('id');
		id = id.split('-')[1];
		$('#item-'+id).remove();	
	});

}