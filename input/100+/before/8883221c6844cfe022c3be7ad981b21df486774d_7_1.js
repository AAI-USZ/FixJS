function() {
		this.requires("2D, DOM, SpriteAnimation, zombi, Collision")
		
		if (this.size == 1) {
			this.collision(new Crafty.polygon([19, 22], [39, 22], [39, 42], [19, 42]));
		} else {
			this.collision(new Crafty.polygon([23, 43], [76, 43], [76, 74], [23, 74]));
		}
		
		this._globalZ = 7;
	}