function firePPEvent(data){
	$('#ppEvents').text(JSON.stringify(data));
	$('#ppEvents').trigger('baseEvent');
	console.log(data);
}