function() {
		if (this.level == undefined) return;

		var elements	= this.level.getItems().concat(this.level.getCharacters());

		for (var i = 0; i < elements.length; i++) {
			var distance = this.getDistanceFrom(elements[i]);
			if (distance <  Cassidie.game.proximity && this.id != elements[i].id) {
				this.proximity(elements[i], distance);
				elements[i].proximity(this, distance);
			}
		}
	}