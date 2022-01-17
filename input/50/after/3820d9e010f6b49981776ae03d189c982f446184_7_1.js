function(x, y, data) {
		this._super('npc', data);

		if (data == undefined) {
			this.x = x;
			this.y = y;
		}
	}