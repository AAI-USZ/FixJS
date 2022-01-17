function(timeout, callback){
        infowindow.initInfo();
        
        var e = infowindow.infoElement;
        
        var h = $("h2", e);
		
		if (gamedata.status == "FINISHED"){
			h.html("TURN " + gamedata.turn + ", GAME OVER");
		}else{
        
            if (gamedata.gamephase == 6){
				h.html(gamedata.getPhasename());
			}
            
			if (gamedata.gamephase == 4){
				h.html("TURN " + gamedata.turn + ", " + gamedata.getPhasename());
			}
			
			if (gamedata.gamephase == 3){
				h.html("TURN " + gamedata.turn + ", " + gamedata.getPhasename());
			}
			
			if (gamedata.gamephase == 2){
				h.html("TURN " + gamedata.turn + ", " + gamedata.getPhasename() +" "+ gamedata.getActiveShipName());
			}
			
			if (gamedata.gamephase == 1){
				h.html("TURN " + gamedata.turn + ", " + gamedata.getPhasename());
			}
		}
        
        infowindow.infoElement.fadeTo(1000, 0.65);
        infowindow.hideInfo(timeout);
        if (callback){
            setTimeout(callback, timeout+1000);
        }
    }