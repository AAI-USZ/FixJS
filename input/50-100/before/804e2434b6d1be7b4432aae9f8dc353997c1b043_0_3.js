function(player, amount, orientation, xPosition, yPosition) {
   
    var armyOfArchers = createArmyOfNoType(player, amount, orientation, xPosition, yPosition);

    armyOfArchers.type = "archer";

    armyOfArchers.range = 3;

    armyOfArchers.units = ONLINGA.Units.Factory.createArchers(amount);

    return armyOfArchers;

  }