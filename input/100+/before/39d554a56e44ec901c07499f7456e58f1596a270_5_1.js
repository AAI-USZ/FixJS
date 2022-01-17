function(){
    
        
        var done = false;
        var found = false;
        var shipchanged = false;
        for (var i in gamedata.ships){
            var ship = gamedata.ships[i];
                    
            for (var a in ship.movement){
                var movement = ship.movement[a];
                
                if (movement.animated == false){
                    if (!movement.commit)
                        break;
                            
                    found = true;
                    if (animation.shipAnimating != ship.id){
                        animation.shipAnimating = ship.id
                        scrolling.scrollToShip(ship);
                        shipchanged = true;
                        
                    }
                    
                    if (animation.checkAnimationDone(movement)){
                        //console.log("animated: ship " +ship.name +" move: " +movement.type);
                        if (!animation.hasMoreforAnimate(ship, movement))
                            done = true;
                        movement.animated = true;
                        gamedata.shipStatusChanged(ship);
                        shipManager.drawShip(ship);
                    }else{
                        //console.log(" - animating: ship " +ship.name +" move: " +movement.type);
                        movement.animationtics ++;
                        shipManager.drawShip(ship);
                        break;
                    }
                }
            
            }
            
            if (found){
                if (done)
                    animation.animationloopdelay = 30;
                    
                break;
            }
            
        }
        
        if (!found)
            animation.endAnimation();
        
    }