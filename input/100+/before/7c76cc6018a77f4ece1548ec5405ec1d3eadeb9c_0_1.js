function add_game_invitation_tag(this_player, players) {
	var players_string = '';
	for(var i=0 ; i<players.length-1 ; i++)
		players_string += players[i] + ' and ';
	players_string += players[players.length-1];

	var game_invitation_tag =
		'<div class="game_invite" player_id=' + this_player['player_id'] + ' game_id=' + this_player['game_id'] + '>' +
			'Play a game with: ' + players_string + 
			'<button type="button" onclick="accept_game_invitation(' + this_player['player_id'] + ')">' +
				'Accept' +
			'<\/button>' +
		'<\/div>';
	$('#game_invites').append(game_invitation_tag);
}