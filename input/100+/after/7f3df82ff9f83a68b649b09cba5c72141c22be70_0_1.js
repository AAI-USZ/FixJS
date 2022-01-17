function(ship){
		var template = $("#shipwindowtemplatecontainer .shipwindow.flight");
		var shipwindow = template.clone(true).appendTo("body");
		
		shipwindow.draggable();
		
		if (ship.userid == gamedata.thisplayer){
			shipwindow.addClass("owned");
			shipwindow.css("left", "50px");
		}else{
			shipwindow.addClass("enemy");
			shipwindow.css("right", "50px");
		}
				
		
		
		shipwindow.data("ship", ship.id);
		shipwindow.addClass("ship_"+ship.id);
		flightWindowManager.populateShipWindow(ship, shipwindow);
        shipWindowManager.bindEvents(shipwindow);
		return shipwindow;
		
	}