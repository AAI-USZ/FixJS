function() {
		if(game.world) {
			game.world.Step(0.12, 10, 10);
			game.world.ClearForces();
			if(game.player) {
				var p = game.player.position.clone(),
					parallax;
				p.X -= a2d.dimension.Width / 2;
				p.Y -= a2d.dimension.Height / 2;
				p.scale(new a2d.Position(-1, -1));
				if(p.X > 0) {
					p.X = 0;
				}
				if(p.X < -game.level.getWidth() * 64 + a2d.dimension.Width) {
					p.X = -game.level.getWidth() * 64 + a2d.dimension.Width;
				}
				game.level.offset = p;
				parallax = p.clone();
				parallax.divide(new a2d.Position(2, 2));
				game.city.offset = parallax;
				parallax2 = parallax.clone();
				parallax2.divide(new a2d.Position(2, 2));
				game.sky.offset = parallax2;
			}			
		}
	}