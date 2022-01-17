function(player, amount, orientation, xPosition, yPosition) {

    var army = new Army();

    army.position.x = xPosition;

    army.position.y = yPosition;

    army.player = player;

    army.orientation = orientation;

    return army;

  }