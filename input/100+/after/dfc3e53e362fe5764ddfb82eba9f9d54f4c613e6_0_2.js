function MultiplayerRankTracker(minPosition, maxPosition) {
	this.minimum = minPosition;
	this.maximum = maxPosition;
	this.rank = new Array(this.maximum - this.minimum + 1);

	//this is supposed to be a private method
	this.findHouseOnTrack = function(house) {
		for (var i = 0; i <= this.rank.length; i++) {
			if (this.rank[i] === null || typeof(this.rank[i]) === 'undefined') {
				continue;
			}

			for (var j = 0; j < this.rank[i].length; j++) {
				if (this.rank[i][j].name === house.name) {
					return new Array(i, j); //i is the array position on the track; j is the house index array on that track;
				}
			}
		}

		return -1;
	};

	//this is supposed to be a private method
	this.putHouseInPosition = function(amount, house) {
		if (this.rank[amount] === null || typeof(this.rank[amount]) === 'undefined') {
			this.rank[amount] = new Array();
		}
		this.rank[amount].push(house);
	};

	this.setPosition = function(amount, house) {
		var indexes = this.findHouseOnTrack(house);
		if (indexes === -1) {
			//house not yet added to the track. just add it.
			this.putHouseInPosition(amount, house);
		} else {
			//house already on track: remove it first, then add it on the right place
			this.rank[indexes[0]] =
				this.rank[indexes[0]].slice(0, indexes[1]).concat(
					this.rank[indexes[0]].slice(indexes[1] + 1)
				);
			this.putHouseInPosition(amount, house);
		}
	};

	this.getPositionOfHouse = function(house) {
		var indexes = this.findHouseOnTrack(house);

		if (indexes === -1) {
			throw 'House ' + house.name + ' is not on the track.';
		}

		return indexes[0] + this.minimum;
	};

	this.getHousesInPosition = function(position) {
		if (position < this.minimum || position > this.maximum) {
			throw 'The track ranges from ' + this.minimum + ' to ' + this.maximum + '.';
		}

		return this.rank[position - this.minimum];
	};

}