function(x, y, end, notify) {
		if (notify == undefined) notify = false;

		this.x = x;
		this.y = y;

		this.proximityCheck();

		if (end) {
			this.isMoving	= false;
			this.setAppearance('standing');

			if (this.type == 'player') {
				var cell = this.level.getCell(this.x, this.y);

				if (cell.level != undefined) Cassidie.game.changeLevel(this, cell.level);
			}
		}

		if (notify) this.sendData('character_positioned', {x: this.x, y: this.y}, true);	
	}