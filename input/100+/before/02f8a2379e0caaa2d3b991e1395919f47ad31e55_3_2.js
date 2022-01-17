function(serverdata){
    
        if (serverdata == null)
            return;
            
        if (gamedata.waiting == false && serverdata.waiting == true && serverdata.changed == false){
             gamedata.waiting = true;
             ajaxInterface.startPollingGamedata();
        }
            
    
        if (serverdata.changed == true){
                
                
            //console.log(serverdata);
            gamedata.turn = serverdata.turn;
            gamedata.gamephase = serverdata.phase;
            gamedata.activeship = serverdata.activeship;
            gamedata.gameid = serverdata.id;
            gamedata.players = serverdata.players;
            gamedata.ships = serverdata.ships;
            gamedata.thisplayer = serverdata.forPlayer;
            gamedata.waiting = serverdata.waiting;
            gamedata.status = serverdata.status;
            gamedata.ballistics = serverdata.ballistics;
            //combatLog.constructLog();
            
            
            
            gamedata.initPhase();
            drawEntities();
        }
        gamedata.checkGameStatus();
    }