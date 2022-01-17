function Order(name, issuer) {
	//how the starred orders will be played?
	this.name = name;
	this.issuer = issuer; //todo should I store the player or the house?

	this.cancel = function() {
		//just remove the order from the board.
	};
}