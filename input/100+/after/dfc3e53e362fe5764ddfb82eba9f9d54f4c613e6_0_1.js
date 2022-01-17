function GameStats() {
	this.playersCount = 6;
	this.wildlings = 0;
	this.ironThrone = new Array(this.playersCount);
	this.fiefdom = new Array(this.playersCount);
	this.kingsCourt = new Array(this.playersCount);

	this.victory = new MultiplayerRankTracker(1, 7);
	this.supply = new MultiplayerRankTracker(0, 6);

	this.setSupply = function(supply, house) {
		this.supply.setPosition(supply, house);
	};

	this.getSupplyOfHouse = function(house) {
		return this.supply.getPositionOfHouse(house);
	};

	this.setVictory = function(victory, house) {
		this.victory.setPosition(victory, house);
	};

	this.getVictoryOfHouse = function(house) {
		return this.victory.getPositionOfHouse(house);
	};

}