function(e){
        //console.log("click on ship");
        
        if (!e || e.which !== 1)
            return;
        
        e.stopPropagation();
        var id = $(this).data("id");
        var ship = gamedata.getShip(id);
        
        if (shipSelectList.haveToShowList(ship, e)){
            shipSelectList.showList(ship);
        }else{
            shipManager.doShipClick(ship);
        }
        
    }