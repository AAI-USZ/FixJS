function(ship, shipwindow){

		var dew = (ship.userid != gamedata.thisplayer && gamedata.gamephase == 1) ? "?" : ew.getDefensiveEW(ship);
		var ccew = (ship.userid != gamedata.thisplayer  && gamedata.gamephase == 1) ? "?": ew.getCCEW(ship);
		
		shipwindow.find(".value.DEW").html(dew);
		shipwindow.find(".value.CCEW").html(ccew);
		var ccew = ew.getCCEWentry(ship);
		var ccewEntry = shipwindow.find(".value.CCEW").parent();
		if (ccew == null){
			ccewEntry.data("ship", ship).data("EW", "CCEW");
		}else{
			ccewEntry.data("ship", ship).data("EW", ccew);
		}
		
	
		
		var template = $("#templatecontainer .ewentry");
		shipwindow.find(".ewentry.deletable").remove();
		
		
		
		for (var i in ship.EW){
			var entry = ship.EW[i];
			if (entry.type=="CCEW" || entry.type =="DEW" || entry.turn != gamedata.turn)
				continue;
				
			element = template.clone(true).appendTo(shipwindow.find(".EW .EWcontainer"));

			element.data("EW", entry);
			element.data("ship", ship);
			
			element.find(".button1").bind("click", ew.buttonDeassignEW);
			element.find(".button2").bind("click", ew.buttonAssignEW);
			var h = entry.type + ":";
			if (entry.type == "OEW")
				h = 'OEW (<span class="shiplink">' + gamedata.getShip(entry.targetid).name + '</span>):';
			element.find(".valueheader").html(h);
			element.find(".value").html(entry.amount);
			
		}
			
		
	}