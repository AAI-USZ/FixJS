function(ship, system){
    
        var selectedShip = gamedata.getSelectedShip();
        if (shipManager.isDestroyed(selectedShip))
            return;
        
        console.log("targetship");
            
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
            
            if (weapon.ballistic && system)
				continue;
            
            var type = 'normal';
            if (weapon.ballistic){
                type = 'ballistic';
            }
                
            
            
            
            if (weaponManager.isOnWeaponArc(selectedShip, ship, weapon)){
                if (weaponManager.checkIsInRange(selectedShip, ship, weapon)){
                    weaponManager.removeFiringOrder(selectedShip, weapon);
                    for (var s=0;s<weapon.guns;s++){
                        
                        var fireid = selectedShip.id+"_"+weapon.id +"_"+(weapon.fireOrders.length+1);
                        
                        var	calledid = -1;
                        if (system)
							calledid = system.id;
							
                        var fire = {
                            id:fireid,
                            type:type,
                            shooterid:selectedShip.id,
                            targetid:ship.id,
                            weaponid:weapon.id,
                            calledid:calledid,
                            turn:gamedata.turn,
                            firingMode:weapon.firingMode,
                            shots:weapon.defaultShots,
                            x:"null",
                            y:"null"
                        };
                        weapon.fireOrders.push(fire);            
                        
                    }
                    if (weapon.ballistic){
                        gamedata.ballistics.push({id:(gamedata.ballistics.length), fireid:fireid, position:shipManager.getShipPosition(selectedShip),
                        facing:shipManager.movement.getLastCommitedMove(selectedShip).facing,
                        targetposition:{x:null, y:null},
                        targetid:ship.id,
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