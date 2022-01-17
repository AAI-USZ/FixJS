function(window) {

    //commited cell

	function Cell() {
		this.initialize();
	}

    //yo man
	Cell.prototype = new RFUIBlock();
	
	Cell.prototype.free = true;


	Cell.prototype.engine;

	Cell.prototype.setEngine = function(engine) {
		this.engine=engine;
	};
	
	
	Cell.prototype.drawWall = function(byuser) {
		
		this.free=false;
		this.setVisualState("stateOver");
		
	};

    Cell.prototype.unDrawWall = function(byuser) {

        this.free=true;
        this.setVisualState("stateDown");
        console.log("1")

    };


	window.Cell = Cell;
}