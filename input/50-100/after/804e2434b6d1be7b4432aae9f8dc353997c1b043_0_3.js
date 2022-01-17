function(player, amount, orientation, xPosition, yPosition) {
   
    var armyOfArchers = this.createArmyOfNoType(player, amount, orientation, xPosition, yPosition);

    armyOfArchers.type = "archer";

    armyOfArchers.range = 3;

    armyOfArchers.units = this.createArchers(amount);

    return armyOfArchers;

  }