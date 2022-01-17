function(){
        var windows = $(".shipwindow:visible").hide();
        gamedata.effectsDrawing = true;
        
        for (var i in gamedata.ships){
            var ship = gamedata.ships[i];
            
            if (shipManager.isDestroyed(ship) && shipManager.getTurnDestroyed(ship) == gamedata.turn && !ship.destructionAnimated ){
                ship.dontDraw = false;
                ship.destructionAnimated = false;
            }
        
        }
            
        for (var i in gamedata.ships){
            var ship = gamedata.ships[i];
            
            var fires = weaponManager.getAllFireOrders(ship);
            
            for (var a in fires){
                var fire = fires[a];
                if (fire.turn != gamedata.turn || fire.type=='intercept' || !fire.rolled)
                    continue;
                
                if (fire.animated){
                    
                }else{
                    if (fire.targetid != -1){
                        var target = gamedata.getShip(fire.targetid);
                        scrolling.scrollToShip(target);
                    }else{
                        scrolling.scrollToPos({x:fire.x, y:fire.y});
                    }
                
                    fire.animated = true;
                    var fires = Array();
                    fires.push(fire);
                    
                    var weapon = shipManager.systems.getSystem(ship, fire.weaponid);
                    weapon = weaponManager.getFiringWeapon(weapon, fire);
                    
                    var otherFires = weaponManager.getAllFireOrders(ship);
                    for (var b in otherFires){
                        var otherFire = otherFires[b];
                        var weapon2 = shipManager.systems.getSystem(ship, otherFire.weaponid);
                        weapon2 = weaponManager.getFiringWeapon(weapon2, otherFire);
                        
                        if (otherFire.rolled && weapon2.name == weapon.name && !otherFire.animated && otherFire.turn == gamedata.turn){
                            if ((otherFire.targetid != -1 && fire.targetid != -1 && otherFire.targetid == fire.targetid)
                            || (fire.x != "null" && otherFire.x == fire.x && fire.y != "null" && otherFire.y == fire.y)){
                                if (fire.pubnotes == otherFire.pubnotes){
                                    otherFire.animated = true;
                                    fires.push(otherFire);
                                }
                            }
                        }
                        
                    }
                    
                    combatLog.logFireOrders(fires);
                    effects.displayWeaponFire(fires, effects.doDisplayAllWeaponFire);
                    //infowindow.informFire(4000, fire, function(){effects.displayWeaponFire(fire);},effects.doDisplayAllWeaponFire);
                    
                    
                    
                    return;
                }
            }
            
            
        }
        
        for (var i in gamedata.ships){
            ship = gamedata.ships[i];
            
            if (shipManager.isDestroyed(ship) && shipManager.getTurnDestroyed(ship) == gamedata.turn && ship.destructionAnimated == false){
                scrolling.scrollToShip(ship);
                effects.displayShipDestroyed(ship, effects.doDisplayAllWeaponFire);
                return;
            }
        
        }
        
        gamedata.effectsDrawing = false;
        windows.show();
        effects.callback();
    
    
    
    }