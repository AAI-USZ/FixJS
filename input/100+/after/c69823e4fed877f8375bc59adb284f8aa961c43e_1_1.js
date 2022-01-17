function(){
		gamedata.subphase = 0;
        shipManager.initShips();
        
        
        gamedata.setPhaseClass();
        for (var i in gamedata.ships){
            gamedata.shipStatusChanged(gamedata.ships[i]);
        }
        
        if (gamedata.gamephase == -1){
            if (gamedata.waiting == false){
                combatLog.onTurnStart();
                infowindow.informPhase(5000, null);
                for (var i in gamedata.ships){
                    var ship = gamedata.ships[i];
                    if (ship.userid == gamedata.thisplayer && !shipManager.isDestroyed(ship)){
                        gamedata.selectShip(ship, false);
                        scrolling.scrollToShip(ship);
                        break;
                    }
                }
            }            
        }
        
        if (gamedata.gamephase == 4){
            if (gamedata.waiting == false){
                effects.displayAllWeaponFire(function(){
					gamedata.subphase = 1;
                    damageDrawer.checkDamages();
                    infowindow.informPhase(5000, null);
                    
                    });
            }
                           
        }
        
               
        if (gamedata.gamephase == 2){
			$(".ballclickable").remove();
			$(".ballisticcanvas").remove();
            ew.RemoveEWEffects();
            animation.setAnimating(animation.animateShipMoves, function(){
                infowindow.informPhase(5000, null);
                scrolling.scrollToShip(gamedata.getActiveShip());
                shipWindowManager.checkIfAnyStatusOpen(gamedata.getActiveShip());
                
                var ship = gamedata.getActiveShip();
                
                if (ship.userid == gamedata.thisplayer){
                    shipManager.movement.doForcedPivot(ship);
                    gamedata.selectShip(ship, false);
                }
           
            });
        }
          
        if (gamedata.gamephase == 1 && gamedata.waiting == false){
            shipManager.power.repeatLastTurnPower();
            infowindow.informPhase(5000, null);
            if (gamedata.waiting == false){
                for (var i in gamedata.ships){
                    var ship = gamedata.ships[i];
                    if (ship.userid == gamedata.thisplayer && !shipManager.isDestroyed(ship)){
                        gamedata.selectShip(ship, false);
                        scrolling.scrollToShip(ship);
                        break;
                    }
                }
            }
        }
        
        if (gamedata.gamephase == 3 && gamedata.waiting == false){
            UI.shipMovement.hide();
            ew.RemoveEWEffects();
            animation.setAnimating(animation.animateShipMoves, function(){
                infowindow.informPhase(5000, null);
                                
                if (gamedata.waiting == false){
                    for (var i in gamedata.ships){
                        var ship = gamedata.ships[i];
                        if (ship.userid == gamedata.thisplayer && !shipManager.isDestroyed(ship)){
                            gamedata.selectShip(ship, false);
                            scrolling.scrollToShip(ship);
                            break;
                        }
                    }
                }
                
        
            });

            
        }
        ballistics.initBallistics();
       
        
        if (gamedata.waiting){
            ajaxInterface.startPollingGamedata();
        }
    }