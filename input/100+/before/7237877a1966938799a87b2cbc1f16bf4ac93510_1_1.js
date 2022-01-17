function () {
		if(game){
			var adminDisconnected = false;

			// If the disconnected user is the admin, we should pick another admin
			if(game.get_users()[socket.id].admin){
				game.reset_admin(socket.id);
				adminDisconnected = true;
			}
			game.remove_user(socket.id);
			socket.broadcast.to(joined_game).emit('new_user', {  users: game.get_users(), points: game.get_scores() });
			games_summary[game.get_url()] = game.get_summary();

			if(adminDisconnected)
				socket.broadcast.to(joined_game).emit('new_admin', {  admin_id: game.get_admin_id(), game_status: game.get_status() });
		}
	}