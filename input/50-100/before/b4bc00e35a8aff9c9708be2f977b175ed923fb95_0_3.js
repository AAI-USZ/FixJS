function explode()
		{
			if(Type === ShotType.SHELL) {
				//AreaDamage(X, Y, Damage, SHELL_DAMAGE_RADIUS * SHELL_DAMAGE_RADIUS, Shooter);
				//Explosions.add(new Explosion(X + Math.random() * 2 - 1, Y + Math.random() * 2 - 1, 0, SHELL_DAMAGE_RADIUS));
			} else if(Type === ShotType.BOMB) {
				//AreaDamage(X, Y, Damage, BOMB_DAMAGE_RADIUS * BOMB_DAMAGE_RADIUS, Shooter);
				//Explosions.add(new Explosion(X + Math.random() * 2 - 1, Y + Math.random() * 2 - 1, 0, BOMB_DAMAGE_RADIUS));
			} else {
				//Explosions.add(new Explosion(X + Math.random() * 2 - 1, Y + Math.random() * 2 - 1, 0, 6 + Math.random() * 3));
			}

			if(bShape != null || bShape != undefined)
				LAYER.remove(bShape);

			Bullets.remove(This);

		}