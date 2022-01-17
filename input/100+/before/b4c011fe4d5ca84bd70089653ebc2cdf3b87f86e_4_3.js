function(){
        $("#phaseheader .turn.value").html("TURN: " + gamedata.turn+ ",");
        $("#phaseheader .phase.value").html(gamedata.getPhasename());
        $("#phaseheader .activeship.value").html(gamedata.getActiveShipName());
        
        var commit = $(".committurn");
        var cancel = $(".cancelturn");
        
        if (gamedata.status == "FINISHED"){
            cancel.hide();
            commit.hide();
            $("#phaseheader .finished").show();
            return;
        }
        
        
        
        if (gamedata.gamephase == 4){
            
            commit.show();
            cancel.hide();
            
        }else if (gamedata.gamephase == 3){
            
            commit.show();
            var ship = gamedata.getSelectedShip();
           
                
            
        }else if (gamedata.gamephase == 2){
            var ship = gamedata.getActiveShip();
            if (shipManager.movement.isMovementReady(ship) && ship.userid == gamedata.thisplayer){
                commit.show();
            }else{
                commit.hide();
            }
            
            
        }else if (gamedata.gamephase == 1){
            
            commit.show();
            cancel.hide();
            
        }else{
            commit.hide();
            cancel.hide();
        }
        
        if (!playerManager.isInGame()){
            cancel.hide();
            commit.hide();
            return;
        }
        
        if (gamedata.waiting){
            $("#phaseheader .waiting.value").show();
            cancel.hide();
            commit.hide();
        }else{
            $("#phaseheader .waiting.value").hide();
        }
        
        cancel.hide();
    }