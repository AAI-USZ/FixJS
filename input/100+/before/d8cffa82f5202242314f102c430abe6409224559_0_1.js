function (data) {
		if(game.get_status() == 'new'){
			var admin = (_.size(game.get_users()) === 0);
			game.add_user(socket.id, data.name, data.screen_name, data.profile_image_url, admin);
			socket.emit('welcome', { users: game.get_users(), points: game.get_scores(), admin: admin });
			socket.broadcast.to(joined_game).emit('new_user', {  users: game.get_users(), points: game.get_scores() });
			games_summary[game.get_url()] = game.get_summary();
		}else{
			socket.emit('game_started', { game_started: 'already started' });
		}
	}