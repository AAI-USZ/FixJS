function(data, level, isPlayer) {			
			this._super(data, level);

			Game.engine.addCharacter(this);

			if (data.isMoving) {
				this.move(data.destinationX, data.destinationY, isPlayer);
			}
			
			this.setParameter();	
		}