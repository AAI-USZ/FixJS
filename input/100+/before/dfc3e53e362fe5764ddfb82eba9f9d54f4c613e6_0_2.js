function GameStats() {
	this.playersCount = 6;
	this.wildlings = 0;
	this.ironThrone = new Array(this.playersCount);
	this.fiefdom = new Array(this.playersCount);
	this.kingsCourt = new Array(this.playersCount);

	this.maxVictory = 7;
	this.victory = new Array(this.playersCount);

	this.maxSupply = 6;
	this.supply = new Array(this.maxSupply + 1); //this.supply[0] = array of houses with 0 supply


	//this is supposed to be a private method
	this.findHouseOnSupplyTrack = function(house) {
		for (var i = 0; i <= this.maxSupply; i++) {
			if (this.supply[i] === null || typeof(this.supply[i]) === 'undefined') {
				continue;
			}

			for (var j = 0; j < this.supply[i].length; j++) {
				if (this.supply[i][j].name === house.name) {
					return new Array(i, j); //i is the amount of supply; j is the house index on that supply;
				}
			}
		}

		return -1;
	}

	//this is supposed to be a private method
	this.putHouseIntoSupply = function(amount, house) {
		if (this.supply[amount] === null || typeof(this.supply[amount]) === 'undefined') {
			this.supply[amount] = new Array();
		}
		this.supply[amount].push(house);
	};

	this.setSupply = function(amount, house) {
		var indexes = this.findHouseOnSupplyTrack(house);
		if (indexes === -1) {
			//house not yet added to the supply track. just add it.
			this.putHouseIntoSupply(amount, house);
		} else {
			//house already in supply track: remove it first, then add it on the right place
			this.supply[indexes[0]] =
				this.supply[indexes[0]].slice(0, indexes[1]).concat(
					this.supply[indexes[0]].slice(indexes[1] + 1)
				);
			this.putHouseIntoSupply(amount, house);
		}
	};

	this.getSupplyOfHouse = function(house) {
		var indexes = this.findHouseOnSupplyTrack(house);

		if (indexes === -1) {
			throw 'House ' + house.name + ' is not on the supply track.';
		}

		return indexes[0];
	};

	this.getHousesWithSupply = function(amountSupply) {
		if (amountSupply < 0 || amountSupply > this.maxSupply) {
			throw 'The supply track ranges from 0 to 6.';
		}

		return this.supply[amountSupply];
	};

}