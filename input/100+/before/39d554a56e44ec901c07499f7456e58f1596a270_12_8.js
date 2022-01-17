function(ship, system){
       
        for(var i = ship.fireOrders.length-1; i >= 0; i--){  
            if(ship.fireOrders[i].weaponid == system.id){              
                  
                for(var a = gamedata.ballistics.length-1; a >= 0; a--){
                    if (gamedata.ballistics[a].fireid == ship.fireOrders[i].id && gamedata.ballistics[a].shooterid == ship.id){
                        var id = gamedata.ballistics[a].id;
                        
                        $('#ballistic_launch_canvas_'+id).remove();
                        $('#ballistic_target_canvas_'+id).remove();
                        $('.ballistic_'+id).remove();
                        gamedata.ballistics.splice(a,1);  
                    }
                }  
                ship.fireOrders.splice(i,1);               
            }
        }
        ballistics.calculateBallisticLocations();
        ballistics.calculateDrawBallistics();                        
        drawEntities();
        
    
    }