function(ball){
         if (gamedata.gamephase != 3)
            return;
            
            
        var selectedShip = gamedata.getSelectedShip();
        if (shipManager.isDestroyed(selectedShip))
            return;
            
        if (!ball.targetid) 
            return;
            
        var target = gamedata.getShip(ball.targetid);
                    
        var toUnselect = Array();
        
        for (var i in gamedata.selectedSystems){
            var weapon = gamedata.selectedSystems[i];
            
            if (ball.targetid != selectedShip.id && !weapon.freeintercept )
                continue;
                
            if (ball.targetid != selectedShip.id && weapon.freeintercept){
                var ballpos = hexgrid.positionToPixel(ball.position);
                var targetpos = shipManager.getShipPositionInWindowCo(target);
                var selectedpos = shipManager.getShipPositionInWindowCo(selectedShip);
                if (mathlib.getDistanceHex(ballpos, targetpos) <= mathlib.getDistanceHex(ballpos, selectedpos) || mathlib.getDistanceHex(targetpos, selectedpos) >3)
                    continue;
            }
            if (shipManager.systems.isDestroyed(selectedShip, weapon) || !weaponManager.isLoaded(weapon))
                continue;
            if (weapon.intercept == 0)
                continue;
                
            var type = 'intercept';
            
                            
            if (weaponManager.isPosOnWeaponArc(selectedShip, ball.position, weapon)){
                weaponManager.removeFiringOrder(selectedShip, weapon);
                for (var s=0;s<weapon.guns;s++){
                    weapon.fireOrders.push({id:null,type:type, shooterid:selectedShip.id, targetid:ball.fireOrderId, weaponid:weapon.id, calledid:-1, turn:gamedata.turn, firingMode:weapon.firingMode, shots:weapon.defaultShots, x:"null", y:"null"});
                }
                toUnselect.push(weapon);
            }
        }
        
        for (var i in toUnselect){
            weaponManager.unSelectWeapon(selectedShip, toUnselect[i]);
        }
        
        gamedata.shipStatusChanged(selectedShip);
        
    }