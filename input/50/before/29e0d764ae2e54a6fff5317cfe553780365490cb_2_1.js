function Order(name, area) {
	//how the starred orders will be played?
	this.name = name;
	this.area = area; //todo attach an order to an unit or to an area?

	this.cancel = function() {
		//just remove the order from the board.
	};
}