function(e, direction, color){
        //console.debug(e.type, e.namespace, direction, color);
        moveRobot(color, directionStringToCode(direction));//keepHistory
    }