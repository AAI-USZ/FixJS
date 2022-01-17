function die()
		{
			var exps = Math.floor(Math.random() * 4 + 8);
			if (IS_MOBILE || getFPS < FPS_TOO_LOW) expos = 2;

			for(var i = 0; i < exps; i++) {
				Explosions.get(X + Math.random() * 14 - 7, Y + Math.random() * 14 - 7, i * 2, 12 + Math.random() * 10);
			}

			var debris = Math.floor(3 + Math.random() * 4);
			if (IS_MOBILE || getFPS < FPS_TOO_LOW) debris = 2;

			for(i = 0; i < debris; i++) {
				var angle = Math.random() * 2 * Math.PI;
				var speed = Math.random() * 4 + .2;
				FlyingDebris.get(X, Y, Math.cos(angle) * speed + This.getDx(), Math.sin(angle) * speed + This.getDy(), Math.random() * 10 + 20);
			}
			
			LAYER.remove(SHAPE); // Bye!
			Team.setScore(Team.getScore() - 1);
			Team.removeUnit(Type.Kind);
			Tanks.remove(This);
		}