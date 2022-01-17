function accept_game_invitation(player_id, game_id) {
	console.log('POST for ' + player_id);
	
	$.ajax({
		type: 'PUT',
		url: 'players/' + player_id,
		data: JSON.stringify({ 'player': { 'accepted': true } }),
		contentType: 'application/json',
		dataType: "json",
		success: function(data) {
			console.log('PUT player update');
			console.log(data);
			disable_game_invitation(data);
		}
	});
}