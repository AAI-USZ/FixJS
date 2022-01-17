function(e){
        var id = $(e).data("id");
        var ship = gamedata.getShip(id);
        
        if (shipSelectList.haveToShowList(ship)){
            shipSelectList.showList(ship);
        }else{
            shipManager.doShipContextMenu(ship);
        }
        
    }