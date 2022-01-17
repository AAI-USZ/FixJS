function(e){
        console.log("mouseover");
		clearTimeout(shipClickable.shipClickableTimer); 
		shipClickable.shipClickableTimer = setTimeout(shipClickable.doMouseOver, 250);
		shipClickable.ship = gamedata.getShip($(this).data("id"));
		if ($(this).hasClass('shiplistentry'))
			shipClickable.testStacked = false;
		else
			shipClickable.testStacked = true;
	}