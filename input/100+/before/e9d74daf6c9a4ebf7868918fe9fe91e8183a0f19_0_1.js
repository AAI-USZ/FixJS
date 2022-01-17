function(window) {

    //commited cell

	function Cell() {
		this.initialize();
	}

    //yo man
	Cell.prototype = new RFUIBlock();
	
	Cell.prototype.infectiousDirections = ["UP","DOWN","RIGHT","LEFT"];
	
	Cell.prototype.free = true;

	Cell.prototype.engine;

	Cell.prototype.setEngine = function(engine) {
		this.engine=engine;
	};
	
	
	Cell.prototype.infect = function(byuser) {
		
		this.free=false;
		this.setVisualState("stateOver");
		
	};


	window.Cell = Cell;
}