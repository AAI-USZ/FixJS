function(){
        
        if (gamedata.gamephase == 1){
        
            if (!shipManager.power.checkPowerPositive()){
                window.confirm.error("You have ships with insufficient power. You need to turn off systems before you can commit the turn.", function(){});
                return false;
            }
        
            for (var i in gamedata.ships){
                var ship = gamedata.ships[i];
                ew.convertUnusedToDEW(ship);
                
            }
            
            ajaxInterface.submitGamedata();
            
        }else if (gamedata.gamephase == 2){
            UI.shipMovement.hide();
            var ship = gamedata.getActiveShip();
            if (shipManager.movement.isMovementReady(ship)){
                shipManager.movement.RemoveMovementIndicators();
                ajaxInterface.submitGamedata();
            }else{
                return false;
            }
        }else if (gamedata.gamephase == 3){
			UI.shipMovement.hide();
            ajaxInterface.submitGamedata();
        }else if (gamedata.gamephase == 4){
            ajaxInterface.submitGamedata();
        }else if (gamedata.gamephase == 6){
            ajaxInterface.submitGamedata();
        }
        
    
            
    }