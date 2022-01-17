function(event) {
	    //console.log(event);
	    var point = new Vector(event.offsetX, event.offsetY);
	    sim.addBoidsRule( new AttractToPoint(point, 5000) ); 
	}