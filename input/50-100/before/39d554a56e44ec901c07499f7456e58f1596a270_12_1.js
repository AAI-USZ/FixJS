function(shooter, target, weapon){
        var sPos = shipManager.getShipPositionInWindowCo(shooter);
        var tPos = shipManager.getShipPositionInWindowCo(target);
        var dis = mathlib.getDistance(sPos, tPos);
        var disInHex = dis / hexgrid.hexWidth();
        var rangePenalty = (weapon.rangePenalty/hexgrid.hexWidth()*dis);
    
        return rangePenalty;
    }