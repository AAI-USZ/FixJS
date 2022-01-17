function(e){
        console.log("onHexClicked");
        return;
        
        if (e && e.which === 1){
            shipManager.movement.RemoveMovementIndicators();
            
            var location = $(this).elementlocation();
            var x = e.pageX - location.x;
            var y = e.pageY - location.y;
            
            var hexpos = hexgrid.pixelCoToHex(x,y);
            
            if (gamedata.thisplayer == -1)
                return;
                            
            if (gamedata.waiting)
                return;
            
            if (gamedata.gamephase == 2 && !gamedata.waiting && gamedata.isMyShip(gamedata.getActiveShip()) 
                && !shipManager.movement.checkHasUncommitted(gamedata.getActiveShip())){
                var s = hexgrid.selectedHex;
                if (s && hexpos.x == s.x && hexpos.y == s.y){
                    shipManager.movement.moveStraightForwardHex(hexpos, true);
                    hexgrid.selectedHex = null;
                }else{
                    shipManager.movement.moveStraightForwardHex(hexpos, false);
                    hexgrid.selectedHex = hexpos;
                }
                
            }else{
                hexgrid.selectedHex = null;
            }
           
            var selectedShip = gamedata.getSelectedShip();
            if (!selectedShip || shipManager.isDestroyed(selectedShip))
                return;
                
            if (gamedata.selectedSystems.length > 0){
                weaponManager.targetHex(hexpos);
            }
        
            if (gamedata.gamephase === -1)
                deployment.onHexClicked(hexpos);
        }
        
    }