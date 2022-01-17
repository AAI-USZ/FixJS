function(ship, shipwindow){
		var dew = (!gamedata.isMyShip(ship) && gamedata.gamephase == 1) ? "?" : ew.getDefensiveEW(ship);
		var ccew = (!gamedata.isMyShip(ship) && gamedata.gamephase == 1) ? "?": ew.getCCEW(ship);
        var bdew = (!gamedata.isMyShip(ship) && gamedata.gamephase == 1) ? "?": ew.getBDEW(ship)*0.25;
		var elint = shipManager.isElint(ship);
		shipwindow.find(".value.DEW").html(dew);
		shipwindow.find(".value.CCEW").html(ccew);

        var ccewElement = shipwindow.find(".value.CCEW").parent();
		if (ccew === 0){
			ccewElement.data("ship", ship).data("EW", "CCEW");
		}else{
			ccewElement.data("ship", ship).data("EW", ew.getCCEWentry(ship));
		}
		
        var BDEWcont = shipwindow.find(".ewentry.BDEW")
        if (elint){
            BDEWcont.show();
            var bdewElement = BDEWcont.find(".value.BDEW");
            bdewElement.html(bdew);
            if (bdew === 0){
                BDEWcont.data("ship", ship).data("EW", "BDEW");
            }else{
                BDEWcont.data("ship", ship).data("EW", ew.getBDEWentry(ship)); 
            }
        }else{
            BDEWcont.hide();  
        }
	
		
		var template = $("#templatecontainer .ewentry");
		shipwindow.find(".ewentry.deletable").remove();
		
		
		
		for (var i in ship.EW){
			var entry = ship.EW[i];
			if ((entry.type != "OEW" && entry.type != "DIST" && entry.type != "SOEW" && entry.type != "SDEW" )|| entry.turn != gamedata.turn)
				continue;
				
			element = template.clone(true).appendTo(shipwindow.find(".EW .EWcontainer"));

			element.data("EW", entry);
			element.data("ship", ship);
            element.find(".button1").bind("click", ew.buttonDeassignEW);
            element.find(".button2").bind("click", ew.buttonAssignEW);

            var h = entry.type +' (<span class="shiplink">' + gamedata.getShip(entry.targetid).name + '</span>):';
            if (entry.type == "SOEW"){
                element.find(".button2").remove();
                element.find(".value").html(entry.amount);
            }else if (entry.type == "SDEW"){
                element.find(".value").html(entry.amount*0.5);
            }else if (entry.type == "DIST"){
                element.find(".value").html((entry.amount/3));
            }else if (entry.type == "OEW"){
                element.find(".value").html((entry.amount - ew.getDistruptionEW(ship)));
            }else{
                element.find(".value").html(entry.amount);
            }
            
            
			element.find(".valueheader").html(h);
			
			
		}
			
		
	}