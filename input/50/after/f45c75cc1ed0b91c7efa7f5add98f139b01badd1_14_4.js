function (underscore) {
    return comb.serial([createTables.bind(this, underscore), patio.syncModels.bind(patio)]);

}