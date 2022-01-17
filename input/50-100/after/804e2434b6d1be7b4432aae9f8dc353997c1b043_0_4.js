function(player, amount, orientation, xPosition, yPosition) {

    var armyOfRiders = this.createArmyOfNoType(player, amount, orientation, xPosition, yPosition);

    armyOfRiders.type = "rider";

    armyOfRiders.range = 4;

    armyOfRiders.units = this.createRiders(amount);

    return armyOfRiders;

  }