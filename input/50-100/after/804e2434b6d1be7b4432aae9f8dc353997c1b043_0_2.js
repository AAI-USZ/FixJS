function(player, amount, orientation, xPosition, yPosition) {
   
    var armyOfKnights = this.createArmyOfNoType(player, amount, orientation, xPosition, yPosition);

    armyOfKnights.type = "knight";

    armyOfKnights.range = 2;

    armyOfKnights.units = this.createKnights(amount);

    return armyOfKnights;

  }