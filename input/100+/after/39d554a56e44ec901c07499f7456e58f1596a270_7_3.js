function(e){
		if (gamedata.waiting == true || gamedata.gamephase != 1)
			return; 
			
        var e = $(this).parent();
        var ship = e.data("ship");
        var entry = e.data("EW");
        
        if (entry == "CCEW" || entry == "BDEW"){
            return;
        }
        
        amount = 1;
        if (entry.type == "DIST")
            amount = 3;
        
        entry.amount -= amount;
        if (entry.amount<1){
            var i = $.inArray(entry, ship.EW);
            ship.EW.splice(i, 1);
            ew.RemoveEWEffects(ship);
            ew.adEWindicators(ship);
            e.data("EW", "");
        }
        gamedata.shipStatusChanged(ship);
        drawEntities();
    }