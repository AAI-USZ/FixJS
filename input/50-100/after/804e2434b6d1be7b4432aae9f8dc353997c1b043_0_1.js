function(player, amount, orientation, xPosition, yPosition) {

    var army = new ONLINGA.Units.Army();

    army.position.x = xPosition;

    army.position.y = yPosition;

    army.player = player;

    army.orientation = orientation;

    return army;

  }