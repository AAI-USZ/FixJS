function(e){
        var id = $(e).data("id");
        var ship = gamedata.getShip(id);
        
        if (shipSelectList.haveToShowList(ship, e)){
            shipSelectList.showList(ship);
        }else{
            shipManager.doShipContextMenu(ship);
        }
        
    }