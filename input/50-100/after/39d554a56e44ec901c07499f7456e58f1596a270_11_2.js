function(e){
        //console.log("click on ship");
        e.stopPropagation();
        var id = $(this).data("id");
        var ship = gamedata.getShip(id);
        
        if (shipSelectList.haveToShowList(ship, e)){
            shipSelectList.showList(ship);
        }else{
            shipManager.doShipClick(ship);
        }
        
    }