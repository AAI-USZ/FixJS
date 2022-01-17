function(){
        
        var tidyships = jQuery.extend(true, {}, gamedata.ships);
        
        for (var i in tidyships){
            var ship = tidyships[i];
            ship.htmlContainer = null;
            ship.shipclickableContainer = null;
            ship.shipStatusWindow = null;
            for (var a = ship.movement.length-1; a>=0; a--){
                var move = ship.movement[a];
                if (move.turn < gamedata.turn){
                    ship.movement.splice(a,1);
                }
            }
            
            for (var a = ship.EW.length-1; a>=0; a--){
                var ew = ship.EW[a];
                if (ew.turn < gamedata.turn){
                    ship.EW.splice(a,1);
                }
            }
            var systems = Array();
            
            for (var a in ship.systems){
                var system = ship.systems[a];
                
                if (ship.flight){
                    var fighterSystems = Array();
                    for (var c in system.systems){
                        var fightersystem = system.systems[c];
                        
                        for (var b = fightersystem.fireOrders.length-1; b>=0; b--){
                            var fire = fightersystem.fireOrders[b];
                            if (fire.turn < gamedata.turn){
                                fightersystem.fireOrders.splice(b,1);
                            }
                        }
                        fighterSystems[c] = {'id':fightersystem.id, 'fireOrders': fightersystem.fireOrders};
                    }
                    
                    systems[a] = {'id': system.id, 'systems': fighterSystems};
             
                    
                }else{
                    for (var b = system.fireOrders.length-1; b>=0; b--){
                        var fire = system.fireOrders[b];
                        if (fire.turn < gamedata.turn){
                            system.fireOrders.splice(b,1);
                        }
                    }

                    for (var b = system.power.length-1; b>=0; b--){
                        var power = system.power[b];
                        if (power.turn < gamedata.turn){
                            system.power.splice(b,1);
                        }
                    }
                    systems[a] = {'id': system.id, 'power': system.power, 'fireOrders': system.fireOrders};
                }
                
            }
            
            ship.systems = systems;
            
        }
       
        var gd = {
            turn: gamedata.turn,
            phase: gamedata.gamephase,
            activeship: gamedata.activeship,
            gameid: gamedata.gameid,
            playerid: gamedata.thisplayer,
            ships: JSON.stringify(tidyships)
        };
  
        return gd;
    }