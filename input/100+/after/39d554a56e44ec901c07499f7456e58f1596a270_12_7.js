function(hexpos){
    
        var selectedShip = gamedata.getSelectedShip();
        if (shipManager.isDestroyed(selectedShip))
            return;
        
        
            
        var toUnselect = Array();
        for (var i in gamedata.selectedSystems){
            var weapon = gamedata.selectedSystems[i];
            
            if (shipManager.systems.isDestroyed(selectedShip, weapon) || !weaponManager.isLoaded(weapon))
                continue;
        
            
            if (weapon.ballistic && gamedata.gamephase != 1){
                continue;
            }
            if (!weapon.ballistic && gamedata.gamephase != 3){
                continue;
            }
            
            if (!weapon.hextarget)
                continue;
            
            var type = 'normal';
            if (weapon.ballistic){
                type = 'ballistic';
            }
                        
            
            if (weaponManager.isPosOnWeaponArc(selectedShip, hexpos, weapon)){
                if (weapon.range == 0 || (mathlib.getDistanceHex(shipManager.getShipPositionInWindowCo(selectedShip), hexgrid.positionToPixel(hexpos))<=weapon.range)){
                    weaponManager.removeFiringOrder(selectedShip, weapon);
                    for (var s=0;s<weapon.guns;s++){
                        
                        var fireid = selectedShip.id+"_"+weapon.id +"_"+(weapon.fireOrders.length+1);
                        var fire = {id:fireid,type:type, shooterid:selectedShip.id, targetid:-1, weaponid:weapon.id, calledid:-1, turn:gamedata.turn, firingMode:weapon.firingMode, shots:weapon.defaultShots, x:hexpos.x, y:hexpos.y};
                        weapon.fireOrders.push(fire);
                        
                    }
                    if (weapon.ballistic){
                        gamedata.ballistics.push({id:(gamedata.ballistics.length), fireid:fireid, position:shipManager.getShipPosition(selectedShip),
                        facing:shipManager.movement.getLastCommitedMove(selectedShip).facing,
                        targetposition:hexpos,
                        targetid:-1,
                        shooterid:selectedShip.id,
                        weaponid:weapon.id,
                        shots:fire.shots});
                        
                        ballistics.calculateBallisticLocations();
                        ballistics.calculateDrawBallistics();                        
                        drawEntities();
                        //$id, $fireid, $position, $facing, $targetpos, $targetid, $shooterid, $weaponid, $shots
                    }
                    
                    toUnselect.push(weapon);
                }
            }
        }
        
        for (var i in toUnselect){
            weaponManager.unSelectWeapon(selectedShip, toUnselect[i]);
        }
        
        gamedata.shipStatusChanged(selectedShip);
    
    }