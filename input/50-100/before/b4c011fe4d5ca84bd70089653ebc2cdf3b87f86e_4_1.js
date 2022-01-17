function(){
        if (gamedata.gamephase == 1)
            return "INITIAL ORDERS";
            
        if (gamedata.gamephase == 2)
            return "MOVEMENT ORDERS:";
        
        if (gamedata.gamephase == 3)
            return "FIRE ORDERS";
            
        if (gamedata.gamephase == 4)
            return "FINAL ORDERS";
            
        return "ERROR"
    }