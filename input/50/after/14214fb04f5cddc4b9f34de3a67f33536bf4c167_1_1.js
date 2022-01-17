function(id) {
		for (var i = 0; i < this.charactersData.length; i++) {
			if (this.charactersData[i].id == id) return this.charactersData[i];
		}
	}