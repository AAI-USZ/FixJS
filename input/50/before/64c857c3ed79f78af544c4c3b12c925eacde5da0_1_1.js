function firePPEvent(data){
	$('#ppEvents').text(data).trigger('baseEvent');
}