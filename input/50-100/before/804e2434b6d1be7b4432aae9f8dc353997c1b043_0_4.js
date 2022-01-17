function(player, amount, orientation, xPosition, yPosition) {
   
    var armyOfRiders = createArmyOfNoType(player, amount, orientation, xPosition, yPosition);

    armyOfRiders.type = "rider";

    armyOfRiders.range = 4;

    armyOfRiders.units = ONLINGA.Units.Factory.createRiders(amount);

    return armyOfRiders;

  }