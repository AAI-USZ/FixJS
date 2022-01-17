function(player, amount, orientation, xPosition, yPosition) {
   
    var armyOfKnights = createArmyOfNoType(player, amount, orientation, xPosition, yPosition);

    armyOfKnights.type = "knight";

    armyOfKnights.range = 2;

    armyOfKnights.units = ONLINGA.Units.Factory.createKnights(amount);

    return armyOfKnights;

  }